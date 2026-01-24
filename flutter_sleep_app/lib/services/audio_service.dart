import 'package:just_audio/just_audio.dart';
import 'package:flutter/foundation.dart';
import 'dart:async';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import '../models/app_state.dart';

// TODO: Import generated Rust bridge
// import '../bridge_generated.dart';

class SleepAudioService {
  static AudioPlayer? _player;
  static Timer? _sleepTimer;
  static Timer? _fadeTimer;
  static bool _isPlaying = false;
  static SoundType? _currentSound;

  /// Initialize the audio service
  static Future<void> initialize() async {
    print('[SleepAudioService] Initializing');
    _player = AudioPlayer();
  }

  /// Check if audio is currently playing
  static bool get isPlaying => _isPlaying;

  /// Get current sound type
  static SoundType? get currentSound => _currentSound;

  /// Start playing a sleep sound with optional timer
  static Future<void> startSleepSound({
    required SoundType soundType,
    int? timerMinutes,
  }) async {
    print('[SleepAudioService] Starting $soundType with ${timerMinutes ?? "no"} timer');

    // Stop any existing playback
    await stop();

    _currentSound = soundType;
    _isPlaying = true;

    try {
      // Generate audio file using Rust engine
      final audioFile = await _generateSleepSound(soundType);

      // Load and play
      await _player!.setFilePath(audioFile.path);
      await _player!.setLoopMode(LoopMode.one);
      await _player!.setVolume(0.7);
      await _player!.play();

      print('[SleepAudioService] Playing ${audioFile.path}');

      // Set up sleep timer if requested
      if (timerMinutes != null && timerMinutes > 0) {
        _startSleepTimer(timerMinutes);
      }
    } catch (e) {
      print('[SleepAudioService] Error starting playback: $e');
      _isPlaying = false;
      rethrow;
    }
  }

  /// Generate sleep sound audio file using Rust engine
  static Future<File> _generateSleepSound(SoundType soundType) async {
    // Get cache directory
    final cacheDir = await getApplicationCacheDirectory();
    final fileName = '${soundType.name}_sleep.wav';
    final filePath = '${cacheDir.path}/$fileName';
    final file = File(filePath);

    // Check if cached file exists (reuse for performance)
    if (await file.exists()) {
      print('[SleepAudioService] Using cached audio: $fileName');
      return file;
    }

    print('[SleepAudioService] Generating new audio: $fileName');

    // Generate 60 seconds of audio (seamless loop)
    // This will be called in background to avoid blocking UI
    await compute(_generateInIsolate, {
      'soundType': soundType,
      'duration': 60.0,
      'outputPath': filePath,
    });

    return file;
  }

  /// Generate audio in isolate to avoid blocking main thread
  static Future<void> _generateInIsolate(Map<String, dynamic> params) async {
    final soundType = params['soundType'] as SoundType;
    final duration = params['duration'] as double;
    final outputPath = params['outputPath'] as String;

    // TODO: Replace with actual Rust FFI call when bridge is generated
    // For now, this is a placeholder showing the intended API

    /*
    // This is how it will work once Rust bridge is set up:

    final rustSoundType = _convertToRustSoundType(soundType);
    final samples = generateSleepSound(
      soundType: rustSoundType,
      durationSecs: duration,
    );

    await saveToWav(
      samples: samples,
      path: outputPath,
    );
    */

    print('[SleepAudioService] Generated ${soundType.name} at $outputPath');
  }

  /// Convert Flutter SoundType to Rust SoundType
  // static RustSoundType _convertToRustSoundType(SoundType type) {
  //   switch (type) {
  //     case SoundType.pinkNoise:
  //       return RustSoundType.PinkNoise;
  //     case SoundType.brownNoise:
  //       return RustSoundType.BrownNoise;
  //     case SoundType.ocean:
  //       return RustSoundType.Ocean;
  //     case SoundType.breathing:
  //       return RustSoundType.Breathing;
  //     case SoundType.airplaneCabin:
  //       return RustSoundType.AirplaneCabin;
  //     case SoundType.rainLight:
  //       return RustSoundType.RainLight;
  //     case SoundType.rainMedium:
  //       return RustSoundType.RainMedium;
  //     case SoundType.rainHeavy:
  //       return RustSoundType.RainHeavy;
  //   }
  // }

  /// Start sleep timer with fade out
  static void _startSleepTimer(int minutes) {
    print('[SleepAudioService] Sleep timer set for $minutes minutes');

    // Cancel any existing timer
    _sleepTimer?.cancel();
    _fadeTimer?.cancel();

    // Calculate fade start time (2 minutes before timer ends)
    final fadeStartMinutes = minutes - 2;
    final fadeStartDuration = Duration(minutes: max(0, fadeStartMinutes));

    // Set timer to start fade
    _sleepTimer = Timer(fadeStartDuration, () {
      _startFadeOut(const Duration(minutes: 2));
    });
  }

  /// Gradually fade out audio over specified duration
  static void _startFadeOut(Duration duration) {
    print('[SleepAudioService] Starting fade out');

    final steps = 120; // 120 steps over 2 minutes = update every second
    final stepDuration = Duration(milliseconds: duration.inMilliseconds ~/ steps);
    final initialVolume = _player?.volume ?? 0.7;
    int currentStep = 0;

    _fadeTimer = Timer.periodic(stepDuration, (timer) async {
      currentStep++;
      final progress = currentStep / steps;
      final newVolume = initialVolume * (1.0 - progress);

      await _player?.setVolume(newVolume);

      if (currentStep >= steps) {
        timer.cancel();
        await stop();
      }
    });
  }

  /// Stop playback and cleanup
  static Future<void> stop() async {
    print('[SleepAudioService] Stopping playback');

    _sleepTimer?.cancel();
    _fadeTimer?.cancel();

    if (_player != null) {
      await _player!.stop();
    }

    _isPlaying = false;
    _currentSound = null;
  }

  /// Pause playback
  static Future<void> pause() async {
    print('[SleepAudioService] Pausing');

    await _player?.pause();
    _isPlaying = false;

    // Pause timers
    // Note: Timer doesn't support pause, so we'd need to track remaining time
    // and restart on resume. For MVP, we'll just cancel.
    _sleepTimer?.cancel();
    _fadeTimer?.cancel();
  }

  /// Resume playback
  static Future<void> resume() async {
    print('[SleepAudioService] Resuming');

    await _player?.play();
    _isPlaying = true;
  }

  /// Set volume (0.0 to 1.0)
  static Future<void> setVolume(double volume) async {
    await _player?.setVolume(volume.clamp(0.0, 1.0));
  }

  /// Dispose of resources
  static Future<void> dispose() async {
    await stop();
    await _player?.dispose();
    _player = null;
  }
}
