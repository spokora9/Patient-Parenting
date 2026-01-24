import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../services/alarm_service.dart';

class WakeAlarmScreen extends StatefulWidget {
  const WakeAlarmScreen({super.key});

  @override
  State<WakeAlarmScreen> createState() => _WakeAlarmScreenState();
}

class _WakeAlarmScreenState extends State<WakeAlarmScreen> {
  final List<String> _birdSounds = [
    'robin',
    'sparrow',
    'cardinal',
    'bluebird',
    'chickadee',
  ];

  final Map<String, String> _birdDisplayNames = {
    'robin': '🐦 Robin',
    'sparrow': '🐦 Sparrow',
    'cardinal': '🐦 Cardinal',
    'bluebird': '🐦 Bluebird',
    'chickadee': '🐦 Chickadee',
  };

  final List<String> _classicalMusic = [
    'chopinNocturne',
    'vivaldiSpring',
    'debussyClair',
    'satiGymnopédie',
    'bachAir',
  ];

  final Map<String, String> _musicDisplayNames = {
    'chopinNocturne': '🎹 Chopin - Nocturne',
    'vivaldiSpring': '🎻 Vivaldi - Spring',
    'debussyClair': '🎹 Debussy - Clair de Lune',
    'satiGymnopédie': '🎹 Satie - Gymnopédie',
    'bachAir': '🎻 Bach - Air on G String',
  };

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Wake Alarm'),
        backgroundColor: Colors.orange.shade500,
        foregroundColor: Colors.white,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.orange.shade500,
              Colors.orange.shade300,
              Colors.yellow.shade200,
            ],
          ),
        ),
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.all(24),
            children: [
              // Wake Time
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Wake Time',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Center(
                      child: InkWell(
                        onTap: () => _selectWakeTime(context, appState),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 32,
                            vertical: 16,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            appState.wakeTime.format(context),
                            style: TextStyle(
                              fontSize: 48,
                              fontWeight: FontWeight.bold,
                              color: Colors.orange.shade700,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Wake Duration
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Wake Duration',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'How long should the gentle wake process take?',
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _DurationOption(
                          minutes: 5,
                          isSelected: appState.wakeDurationMinutes == 5,
                          onTap: () => appState.setWakeDuration(5),
                        ),
                        _DurationOption(
                          minutes: 10,
                          isSelected: appState.wakeDurationMinutes == 10,
                          onTap: () => appState.setWakeDuration(10),
                        ),
                        _DurationOption(
                          minutes: 15,
                          isSelected: appState.wakeDurationMinutes == 15,
                          onTap: () => appState.setWakeDuration(15),
                        ),
                        _DurationOption(
                          minutes: 20,
                          isSelected: appState.wakeDurationMinutes == 20,
                          onTap: () => appState.setWakeDuration(20),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Bird Sound Selection
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Bird Sound',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Birds gradually increase from silence to gentle chirping',
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 16),
                    ..._birdSounds.map((bird) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: _SelectionOption(
                          label: _birdDisplayNames[bird]!,
                          isSelected: appState.selectedBirdSound == bird,
                          onTap: () => appState.setSelectedBirdSound(bird),
                        ),
                      );
                    }),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Classical Music Selection
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Classical Music',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Fades in during the last ${((1.0 - appState.melodyStartPercent) * 100).round()}% of wake',
                      style: const TextStyle(
                        fontSize: 13,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 16),
                    ..._classicalMusic.map((music) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: _SelectionOption(
                          label: _musicDisplayNames[music]!,
                          isSelected: appState.selectedClassicalMusic == music,
                          onTap: () => appState.setSelectedClassicalMusic(music),
                        ),
                      );
                    }),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Melody Start Timing
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'When should music start?',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _MelodyStartOption(
                          percent: 0.75,
                          label: 'Last 25%',
                          isSelected: appState.melodyStartPercent == 0.75,
                          onTap: () => appState.setMelodyStartPercent(0.75),
                        ),
                        _MelodyStartOption(
                          percent: 0.85,
                          label: 'Last 15%',
                          isSelected: appState.melodyStartPercent == 0.85,
                          onTap: () => appState.setMelodyStartPercent(0.85),
                        ),
                        _MelodyStartOption(
                          percent: 0.90,
                          label: 'Last 10%',
                          isSelected: appState.melodyStartPercent == 0.90,
                          onTap: () => appState.setMelodyStartPercent(0.90),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              // Set/Cancel Alarm Button
              Center(
                child: appState.isWakeAlarmSet
                    ? ElevatedButton(
                        onPressed: () => _cancelAlarm(context, appState),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red.shade400,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 48,
                            vertical: 20,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.alarm_off, size: 28),
                            SizedBox(width: 12),
                            Text(
                              'Cancel Alarm',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      )
                    : ElevatedButton(
                        onPressed: () => _setAlarm(context, appState),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: Colors.orange.shade700,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 48,
                            vertical: 20,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.alarm_add, size: 28),
                            SizedBox(width: 12),
                            Text(
                              'Set Alarm',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _selectWakeTime(BuildContext context, AppState appState) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: appState.wakeTime,
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: Colors.orange.shade600,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null) {
      appState.setWakeTime(picked);
    }
  }

  Future<void> _setAlarm(BuildContext context, AppState appState) async {
    try {
      // Calculate wake time for today/tomorrow
      final now = DateTime.now();
      var wakeDateTime = DateTime(
        now.year,
        now.month,
        now.day,
        appState.wakeTime.hour,
        appState.wakeTime.minute,
      );

      // If wake time is before now, schedule for tomorrow
      if (wakeDateTime.isBefore(now)) {
        wakeDateTime = wakeDateTime.add(const Duration(days: 1));
      }

      await AlarmService.scheduleWakeAlarm(
        wakeTime: wakeDateTime,
        durationMinutes: appState.wakeDurationMinutes,
        birdSound: appState.selectedBirdSound,
        classicalMusic: appState.selectedClassicalMusic,
        melodyStartPercent: appState.melodyStartPercent,
      );

      appState.setWakeAlarmSet(true);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Alarm set for ${appState.wakeTime.format(context)}'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error setting alarm: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Future<void> _cancelAlarm(BuildContext context, AppState appState) async {
    try {
      await AlarmService.cancelWakeAlarm();
      appState.setWakeAlarmSet(false);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Alarm cancelled'),
            backgroundColor: Colors.orange,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error cancelling alarm: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}

class _DurationOption extends StatelessWidget {
  final int minutes;
  final bool isSelected;
  final VoidCallback onTap;

  const _DurationOption({
    required this.minutes,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? Colors.white : Colors.white.withOpacity(0.4),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            '$minutes min',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: isSelected ? Colors.orange.shade700 : Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}

class _SelectionOption extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _SelectionOption({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: isSelected
                ? Colors.white
                : Colors.white.withOpacity(0.4),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  label,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    color: isSelected ? Colors.orange.shade700 : Colors.white,
                  ),
                ),
              ),
              if (isSelected)
                Icon(
                  Icons.check_circle,
                  color: Colors.orange.shade700,
                  size: 20,
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _MelodyStartOption extends StatelessWidget {
  final double percent;
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _MelodyStartOption({
    required this.percent,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? Colors.white : Colors.white.withOpacity(0.4),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: isSelected ? Colors.orange.shade700 : Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
