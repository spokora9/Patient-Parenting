import 'package:flutter/foundation.dart';
import 'package:hive/hive.dart';

enum SoundType {
  pinkNoise,
  brownNoise,
  ocean,
  breathing,
  airplaneCabin,
  rainLight,
  rainMedium,
  rainHeavy,
}

extension SoundTypeExtension on SoundType {
  String get displayName {
    switch (this) {
      case SoundType.pinkNoise:
        return '🌸 Pink Noise';
      case SoundType.brownNoise:
        return '🟤 Brown Noise';
      case SoundType.ocean:
        return '🌊 Ocean Waves';
      case SoundType.breathing:
        return '🫁 Breathing Guide';
      case SoundType.airplaneCabin:
        return '✈️ Airplane Cabin';
      case SoundType.rainLight:
        return '🌧️ Light Rain';
      case SoundType.rainMedium:
        return '🌧️ Medium Rain';
      case SoundType.rainHeavy:
        return '⛈️ Heavy Rain';
    }
  }

  String get description {
    switch (this) {
      case SoundType.pinkNoise:
        return 'Increases deep sleep by 75%';
      case SoundType.brownNoise:
        return 'Deepest sleep, masks tinnitus';
      case SoundType.ocean:
        return 'Matches slow-wave sleep rhythm';
      case SoundType.breathing:
        return '4-6 breaths/min relaxation';
      case SoundType.airplaneCabin:
        return 'Comforting engine hum';
      case SoundType.rainLight:
        return 'Gentle patter';
      case SoundType.rainMedium:
        return 'Steady rainfall';
      case SoundType.rainHeavy:
        return 'Thunderstorm intensity';
    }
  }
}

class AppState extends ChangeNotifier {
  final Box _settingsBox = Hive.box('settings');

  // Sleep Timer State
  SoundType _selectedSound = SoundType.ocean;
  int _sleepTimerMinutes = 30;
  bool _isSleepTimerActive = false;
  bool _autoSetWakeAlarm = false;

  // Wake Alarm State
  TimeOfDay _wakeTime = const TimeOfDay(hour: 7, minute: 0);
  int _wakeDurationMinutes = 10;
  String _selectedBirdSound = 'robin';
  String _selectedClassicalMusic = 'chopinNocturne';
  double _melodyStartPercent = 0.85; // Last 15%
  bool _isWakeAlarmSet = false;

  AppState() {
    _loadSettings();
  }

  // Getters
  SoundType get selectedSound => _selectedSound;
  int get sleepTimerMinutes => _sleepTimerMinutes;
  bool get isSleepTimerActive => _isSleepTimerActive;
  bool get autoSetWakeAlarm => _autoSetWakeAlarm;
  TimeOfDay get wakeTime => _wakeTime;
  int get wakeDurationMinutes => _wakeDurationMinutes;
  String get selectedBirdSound => _selectedBirdSound;
  String get selectedClassicalMusic => _selectedClassicalMusic;
  double get melodyStartPercent => _melodyStartPercent;
  bool get isWakeAlarmSet => _isWakeAlarmSet;

  // Setters with persistence
  void setSelectedSound(SoundType sound) {
    _selectedSound = sound;
    _settingsBox.put('selectedSound', sound.index);
    notifyListeners();
  }

  void setSleepTimerMinutes(int minutes) {
    _sleepTimerMinutes = minutes;
    _settingsBox.put('sleepTimerMinutes', minutes);
    notifyListeners();
  }

  void setSleepTimerActive(bool active) {
    _isSleepTimerActive = active;
    notifyListeners();
  }

  void setAutoSetWakeAlarm(bool auto) {
    _autoSetWakeAlarm = auto;
    _settingsBox.put('autoSetWakeAlarm', auto);
    notifyListeners();
  }

  void setWakeTime(TimeOfDay time) {
    _wakeTime = time;
    _settingsBox.put('wakeHour', time.hour);
    _settingsBox.put('wakeMinute', time.minute);
    notifyListeners();
  }

  void setWakeDuration(int minutes) {
    _wakeDurationMinutes = minutes;
    _settingsBox.put('wakeDuration', minutes);
    notifyListeners();
  }

  void setSelectedBirdSound(String sound) {
    _selectedBirdSound = sound;
    _settingsBox.put('birdSound', sound);
    notifyListeners();
  }

  void setSelectedClassicalMusic(String music) {
    _selectedClassicalMusic = music;
    _settingsBox.put('classicalMusic', music);
    notifyListeners();
  }

  void setMelodyStartPercent(double percent) {
    _melodyStartPercent = percent;
    _settingsBox.put('melodyStart', percent);
    notifyListeners();
  }

  void setWakeAlarmSet(bool set) {
    _isWakeAlarmSet = set;
    notifyListeners();
  }

  // Load settings from storage
  void _loadSettings() {
    _selectedSound = SoundType.values[_settingsBox.get('selectedSound', defaultValue: 2)];
    _sleepTimerMinutes = _settingsBox.get('sleepTimerMinutes', defaultValue: 30);
    _autoSetWakeAlarm = _settingsBox.get('autoSetWakeAlarm', defaultValue: false);
    _wakeTime = TimeOfDay(
      hour: _settingsBox.get('wakeHour', defaultValue: 7),
      minute: _settingsBox.get('wakeMinute', defaultValue: 0),
    );
    _wakeDurationMinutes = _settingsBox.get('wakeDuration', defaultValue: 10);
    _selectedBirdSound = _settingsBox.get('birdSound', defaultValue: 'robin');
    _selectedClassicalMusic = _settingsBox.get('classicalMusic', defaultValue: 'chopinNocturne');
    _melodyStartPercent = _settingsBox.get('melodyStart', defaultValue: 0.85);
  }
}
