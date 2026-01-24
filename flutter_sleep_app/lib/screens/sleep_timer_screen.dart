import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../services/audio_service.dart';

class SleepTimerScreen extends StatefulWidget {
  const SleepTimerScreen({super.key});

  @override
  State<SleepTimerScreen> createState() => _SleepTimerScreenState();
}

class _SleepTimerScreenState extends State<SleepTimerScreen> {
  bool _isPlaying = false;

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Sleep Timer'),
        backgroundColor: Colors.deepPurple.shade700,
        foregroundColor: Colors.white,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.deepPurple.shade700,
              Colors.deepPurple.shade500,
              Colors.purple.shade300,
            ],
          ),
        ),
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.all(24),
            children: [
              // Header
              const Text(
                'Choose Your Sound',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Science-based sounds designed to help you fall asleep naturally',
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.white70,
                ),
              ),
              const SizedBox(height: 24),

              // Sound Selection
              ...SoundType.values.map((sound) {
                final isSelected = appState.selectedSound == sound;
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _SoundCard(
                    soundType: sound,
                    isSelected: isSelected,
                    onTap: () {
                      appState.setSelectedSound(sound);
                    },
                  ),
                );
              }),

              const SizedBox(height: 32),

              // Timer Duration
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Sleep Timer',
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
                        _TimerOption(
                          minutes: 15,
                          isSelected: appState.sleepTimerMinutes == 15,
                          onTap: () => appState.setSleepTimerMinutes(15),
                        ),
                        _TimerOption(
                          minutes: 30,
                          isSelected: appState.sleepTimerMinutes == 30,
                          onTap: () => appState.setSleepTimerMinutes(30),
                        ),
                        _TimerOption(
                          minutes: 45,
                          isSelected: appState.sleepTimerMinutes == 45,
                          onTap: () => appState.setSleepTimerMinutes(45),
                        ),
                        _TimerOption(
                          minutes: 60,
                          isSelected: appState.sleepTimerMinutes == 60,
                          onTap: () => appState.setSleepTimerMinutes(60),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _TimerOption(
                          minutes: 90,
                          isSelected: appState.sleepTimerMinutes == 90,
                          onTap: () => appState.setSleepTimerMinutes(90),
                        ),
                        const SizedBox(width: 12),
                        _TimerOption(
                          minutes: 0,
                          label: 'No Timer',
                          isSelected: appState.sleepTimerMinutes == 0,
                          onTap: () => appState.setSleepTimerMinutes(0),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              // Auto-set Wake Alarm Toggle
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  children: [
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Auto-set Wake Alarm',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Automatically schedule your wake alarm when sleep timer starts',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.white70,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Switch(
                      value: appState.autoSetWakeAlarm,
                      onChanged: (value) {
                        appState.setAutoSetWakeAlarm(value);
                      },
                      activeColor: Colors.orange.shade300,
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              // Play/Stop Button
              Center(
                child: _isPlaying
                    ? Column(
                        children: [
                          ElevatedButton(
                            onPressed: _stopSound,
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
                                Icon(Icons.stop, size: 28),
                                SizedBox(width: 12),
                                Text(
                                  'Stop',
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'Playing ${appState.selectedSound.displayName}',
                            style: const TextStyle(
                              color: Colors.white70,
                              fontSize: 14,
                            ),
                          ),
                          if (appState.sleepTimerMinutes > 0)
                            Text(
                              'Will fade out after ${appState.sleepTimerMinutes} min',
                              style: const TextStyle(
                                color: Colors.white54,
                                fontSize: 12,
                              ),
                            ),
                        ],
                      )
                    : ElevatedButton(
                        onPressed: _startSound,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: Colors.deepPurple.shade700,
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
                            Icon(Icons.play_arrow, size: 28),
                            SizedBox(width: 12),
                            Text(
                              'Start',
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

  Future<void> _startSound() async {
    final appState = context.read<AppState>();

    try {
      await SleepAudioService.startSleepSound(
        soundType: appState.selectedSound,
        timerMinutes: appState.sleepTimerMinutes > 0
            ? appState.sleepTimerMinutes
            : null,
      );

      setState(() {
        _isPlaying = true;
      });

      appState.setSleepTimerActive(true);

      // Auto-set wake alarm if enabled
      if (appState.autoSetWakeAlarm) {
        // TODO: Trigger alarm scheduling
        // AlarmService.scheduleWakeAlarm(...)
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error starting sound: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Future<void> _stopSound() async {
    final appState = context.read<AppState>();

    await SleepAudioService.stop();

    setState(() {
      _isPlaying = false;
    });

    appState.setSleepTimerActive(false);
  }

  @override
  void dispose() {
    SleepAudioService.stop();
    super.dispose();
  }
}

class _SoundCard extends StatelessWidget {
  final SoundType soundType;
  final bool isSelected;
  final VoidCallback onTap;

  const _SoundCard({
    required this.soundType,
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
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isSelected
                ? Colors.white.withOpacity(0.25)
                : Colors.white.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isSelected ? Colors.white : Colors.transparent,
              width: 2,
            ),
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      soundType.displayName,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      soundType.description,
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.white.withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              ),
              if (isSelected)
                const Icon(
                  Icons.check_circle,
                  color: Colors.white,
                  size: 24,
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _TimerOption extends StatelessWidget {
  final int minutes;
  final String? label;
  final bool isSelected;
  final VoidCallback onTap;

  const _TimerOption({
    required this.minutes,
    this.label,
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
            color: isSelected
                ? Colors.white
                : Colors.white.withOpacity(0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            label ?? '$minutes min',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: isSelected
                  ? Colors.deepPurple.shade700
                  : Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
