import 'package:audio_service/audio_service.dart';
import 'package:just_audio/just_audio.dart';
import 'package:flutter_volume_controller/flutter_volume_controller.dart';
import 'package:screen_brightness/screen_brightness.dart';
import 'package:flutter/services.dart';
import 'dart:async';
import 'dart:math';

class SlowWakeAudioHandler extends BaseAudioHandler {
  final int durationMinutes;
  final String birdSound;
  final String classicalMusic;
  final double melodyStartPercent;

  late AudioPlayer _birdPlayer;
  late AudioPlayer _musicPlayer;
  Timer? _progressTimer;
  Timer? _volumeTimer;
  Timer? _brightnessTimer;

  int _elapsedSeconds = 0;
  final int _totalSeconds;

  double _initialSystemVolume = 0.0;

  SlowWakeAudioHandler({
    required this.durationMinutes,
    required this.birdSound,
    required this.classicalMusic,
    required this.melodyStartPercent,
  }) : _totalSeconds = durationMinutes * 60 {
    _initialize();
  }

  Future<void> _initialize() async {
    print('[SlowWakeHandler] Initializing wake sequence');

    // Create audio players
    _birdPlayer = AudioPlayer();
    _musicPlayer = AudioPlayer();

    // Get initial system volume and store it
    _initialSystemVolume = await FlutterVolumeController.getVolume() ?? 0.0;

    // Set system volume to 0 to start
    await FlutterVolumeController.setVolume(0.0);

    // Set screen brightness to minimum
    try {
      await ScreenBrightness().setScreenBrightness(0.01);
    } catch (e) {
      print('[SlowWakeHandler] Brightness control error: $e');
    }

    // Load audio files
    try {
      await _birdPlayer.setAsset('assets/birds/$birdSound.mp3');
      await _musicPlayer.setAsset('assets/classical/$classicalMusic.mp3');

      // Set bird player to loop
      _birdPlayer.setLoopMode(LoopMode.one);

      print('[SlowWakeHandler] Audio files loaded');
    } catch (e) {
      print('[SlowWakeHandler] Error loading audio: $e');
    }

    // Start the wake sequence
    await _startWakeSequence();
  }

  Future<void> _startWakeSequence() async {
    print('[SlowWakeHandler] Starting wake sequence');

    // Update playback state
    playbackState.add(playbackState.value.copyWith(
      playing: true,
      controls: [
        MediaControl.pause,
        MediaControl.stop,
      ],
      processingState: AudioProcessingState.ready,
    ));

    // Set bird player volume to 0 and start playing
    _birdPlayer.setVolume(0.0);
    await _birdPlayer.play();

    // Start gradual increase timers
    _startVolumeGradient();
    _startBrightnessGradient();
    _startProgressTracking();

    // Calculate when to start music (at melodyStartPercent of duration)
    final musicStartSeconds = (_totalSeconds * melodyStartPercent).round();
    Timer(Duration(seconds: musicStartSeconds), _startMusic);
  }

  void _startVolumeGradient() {
    // Update volume every second
    _volumeTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_elapsedSeconds >= _totalSeconds) {
        timer.cancel();
        return;
      }

      final progress = _elapsedSeconds / _totalSeconds;

      // Calculate bird volume (0 → 80% over full duration)
      final birdVolume = min(0.8, progress * 0.8);
      _birdPlayer.setVolume(birdVolume);

      // Calculate system volume (0 → 50% over full duration)
      final systemVolume = min(0.5, progress * 0.5);
      FlutterVolumeController.setVolume(systemVolume);

      // Calculate music volume if playing
      if (_elapsedSeconds >= (_totalSeconds * melodyStartPercent).round()) {
        final musicProgress = (_elapsedSeconds - (_totalSeconds * melodyStartPercent)) /
                             (_totalSeconds * (1.0 - melodyStartPercent));
        final musicVolume = min(1.0, musicProgress * 1.0);
        _musicPlayer.setVolume(musicVolume);
      }
    });
  }

  void _startBrightnessGradient() {
    // Update brightness every 5 seconds for smoother battery usage
    _brightnessTimer = Timer.periodic(const Duration(seconds: 5), (timer) async {
      if (_elapsedSeconds >= _totalSeconds) {
        timer.cancel();
        return;
      }

      final progress = _elapsedSeconds / _totalSeconds;

      // Logarithmic brightness curve (sunrise simulation)
      // Starts very slow, accelerates at the end
      final logProgress = log(1 + progress * (e - 1)) / log(e);
      final brightness = 0.01 + (logProgress * 0.99); // 1% → 100%

      try {
        await ScreenBrightness().setScreenBrightness(brightness);
      } catch (e) {
        print('[SlowWakeHandler] Brightness error: $e');
      }
    });
  }

  void _startProgressTracking() {
    // Update progress every second
    _progressTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      _elapsedSeconds++;

      // Update media notification with progress
      final progress = _elapsedSeconds / _totalSeconds;
      final remainingMinutes = ((_totalSeconds - _elapsedSeconds) / 60).ceil();

      mediaItem.add(MediaItem(
        id: 'slow_wake',
        title: 'Gentle Wake',
        artist: '$remainingMinutes min remaining',
        duration: Duration(seconds: _totalSeconds),
        artUri: Uri.parse('android.resource://com.patientparenting.sleep/drawable/sunrise'),
      ));

      playbackState.add(playbackState.value.copyWith(
        updatePosition: Duration(seconds: _elapsedSeconds),
      ));

      // Check if wake sequence is complete
      if (_elapsedSeconds >= _totalSeconds) {
        timer.cancel();
        _completeWakeSequence();
      }
    });
  }

  Future<void> _startMusic() async {
    print('[SlowWakeHandler] Starting classical music fade-in');

    try {
      // Start music at 0 volume
      _musicPlayer.setVolume(0.0);
      await _musicPlayer.play();
    } catch (e) {
      print('[SlowWakeHandler] Error starting music: $e');
    }
  }

  Future<void> _completeWakeSequence() async {
    print('[SlowWakeHandler] Wake sequence complete');

    // Final haptic feedback
    try {
      await HapticFeedback.heavyImpact();
      await Future.delayed(const Duration(milliseconds: 500));
      await HapticFeedback.heavyImpact();
    } catch (e) {
      print('[SlowWakeHandler] Haptic error: $e');
    }

    // Ensure full brightness
    try {
      await ScreenBrightness().setScreenBrightness(1.0);
    } catch (e) {
      print('[SlowWakeHandler] Final brightness error: $e');
    }

    // Update state
    playbackState.add(playbackState.value.copyWith(
      playing: false,
      processingState: AudioProcessingState.completed,
    ));
  }

  @override
  Future<void> pause() async {
    print('[SlowWakeHandler] Pausing wake sequence');

    await _birdPlayer.pause();
    await _musicPlayer.pause();

    _volumeTimer?.cancel();
    _brightnessTimer?.cancel();
    _progressTimer?.cancel();

    playbackState.add(playbackState.value.copyWith(
      playing: false,
      controls: [MediaControl.play, MediaControl.stop],
    ));
  }

  @override
  Future<void> play() async {
    print('[SlowWakeHandler] Resuming wake sequence');

    await _birdPlayer.play();
    if (_elapsedSeconds >= (_totalSeconds * melodyStartPercent).round()) {
      await _musicPlayer.play();
    }

    _startVolumeGradient();
    _startBrightnessGradient();
    _startProgressTracking();

    playbackState.add(playbackState.value.copyWith(
      playing: true,
      controls: [MediaControl.pause, MediaControl.stop],
    ));
  }

  @override
  Future<void> stop() async {
    print('[SlowWakeHandler] Stopping wake sequence');

    // Stop all timers
    _volumeTimer?.cancel();
    _brightnessTimer?.cancel();
    _progressTimer?.cancel();

    // Stop audio
    await _birdPlayer.stop();
    await _musicPlayer.stop();

    // Restore system volume
    await FlutterVolumeController.setVolume(_initialSystemVolume);

    // Reset brightness to system default
    try {
      await ScreenBrightness().resetScreenBrightness();
    } catch (e) {
      print('[SlowWakeHandler] Reset brightness error: $e');
    }

    // Dispose players
    await _birdPlayer.dispose();
    await _musicPlayer.dispose();

    playbackState.add(playbackState.value.copyWith(
      playing: false,
      processingState: AudioProcessingState.idle,
    ));

    // Stop audio service
    await super.stop();
  }
}
