import 'package:android_alarm_manager_plus/android_alarm_manager_plus.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:audio_service/audio_service.dart';
import 'package:hive/hive.dart';
import 'dart:async';
import 'slow_wake_handler.dart';

class AlarmService {
  static const int WAKE_ALARM_ID = 0;
  static const String ALARM_CONFIG_KEY = 'wake_alarm_config';

  static final FlutterLocalNotificationsPlugin _notifications =
      FlutterLocalNotificationsPlugin();

  /// Initialize alarm service
  static Future<void> initialize() async {
    // Initialize Android Alarm Manager
    await AndroidAlarmManager.initialize();

    // Initialize local notifications
    const androidSettings = AndroidInitializationSettings('@drawable/sunrise');
    const iosSettings = DarwinInitializationSettings();
    const settings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );

    await _notifications.initialize(settings);

    print('[AlarmService] Initialized successfully');
  }

  /// Schedule a wake alarm
  static Future<void> scheduleWakeAlarm({
    required DateTime wakeTime,
    required int durationMinutes,
    required String birdSound,
    required String classicalMusic,
    required double melodyStartPercent,
  }) async {
    // Calculate when to start the wake process
    final wakeStartTime = wakeTime.subtract(Duration(minutes: durationMinutes));

    // Save alarm configuration
    final config = {
      'wakeTime': wakeTime.millisecondsSinceEpoch,
      'duration': durationMinutes,
      'birdSound': birdSound,
      'music': classicalMusic,
      'melodyStart': melodyStartPercent,
    };

    final box = await Hive.openBox('alarm_config');
    await box.put(ALARM_CONFIG_KEY, config);

    // Cancel any existing alarm
    await AndroidAlarmManager.cancel(WAKE_ALARM_ID);

    // Schedule new alarm
    await AndroidAlarmManager.oneShotAt(
      wakeStartTime,
      WAKE_ALARM_ID,
      wakeAlarmCallback,
      exact: true,
      wakeup: true,
      rescheduleOnReboot: true,
    );

    print('[AlarmService] Alarm scheduled for ${wakeStartTime.toString()}');

    // Show notification
    await _showAlarmSetNotification(wakeTime);
  }

  /// Cancel wake alarm
  static Future<void> cancelWakeAlarm() async {
    await AndroidAlarmManager.cancel(WAKE_ALARM_ID);
    await _notifications.cancel(WAKE_ALARM_ID);
    print('[AlarmService] Alarm cancelled');
  }

  /// This callback runs even if app is closed
  @pragma('vm:entry-point')
  static Future<void> wakeAlarmCallback() async {
    print('[AlarmService] Wake alarm triggered!');

    // Initialize Hive in background isolate
    await Hive.initFlutter();
    final box = await Hive.openBox('alarm_config');
    final config = box.get(ALARM_CONFIG_KEY);

    if (config == null) {
      print('[AlarmService] No config found');
      return;
    }

    // Initialize Audio Service
    await AudioService.init(
      builder: () => SlowWakeAudioHandler(
        durationMinutes: config['duration'],
        birdSound: config['birdSound'],
        classicalMusic: config['music'],
        melodyStartPercent: config['melodyStart'],
      ),
      config: const AudioServiceConfig(
        androidNotificationChannelId: 'com.patientparenting.sleep.wake',
        androidNotificationChannelName: 'Slow Wake Timer',
        androidNotificationIcon: 'drawable/sunrise',
        androidShowNotificationBadge: true,
      ),
    );

    print('[AlarmService] Audio service initialized');
  }

  /// Show notification that alarm is set
  static Future<void> _showAlarmSetNotification(DateTime wakeTime) async {
    const androidDetails = AndroidNotificationDetails(
      'wake_alarm_channel',
      'Wake Alarms',
      channelDescription: 'Notifications for set wake alarms',
      importance: Importance.low,
      priority: Priority.low,
      icon: '@drawable/sunrise',
    );

    const iosDetails = DarwinNotificationDetails();

    const details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );

    final timeStr = '${wakeTime.hour.toString().padLeft(2, '0')}:${wakeTime.minute.toString().padLeft(2, '0')}';

    await _notifications.show(
      WAKE_ALARM_ID,
      'Wake Alarm Set',
      'Your gentle wake will begin at $timeStr',
      details,
    );
  }
}
