import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import 'sleep_timer_screen.dart';
import 'wake_alarm_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.indigo.shade900,
              Colors.indigo.shade700,
              Colors.purple.shade400,
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              const SizedBox(height: 40),
              // Header
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 24.0),
                child: Column(
                  children: [
                    Text(
                      'Patient Parenting',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.w300,
                        color: Colors.white,
                        letterSpacing: 1.2,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Sleep & Wake',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 60),

              // Main Cards
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Sleep Timer Card
                      _FeatureCard(
                        title: 'Sleep Timer',
                        subtitle: 'Science-based sounds to help you fall asleep',
                        icon: Icons.bedtime,
                        gradient: LinearGradient(
                          colors: [
                            Colors.deepPurple.shade400,
                            Colors.deepPurple.shade600,
                          ],
                        ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => const SleepTimerScreen(),
                            ),
                          );
                        },
                      ),

                      const SizedBox(height: 24),

                      // Wake Alarm Card
                      Consumer<AppState>(
                        builder: (context, appState, _) {
                          return _FeatureCard(
                            title: 'Wake Alarm',
                            subtitle: appState.isWakeAlarmSet
                                ? 'Alarm set for ${appState.wakeTime.format(context)}'
                                : 'Gentle wake with birds & classical music',
                            icon: Icons.wb_sunny,
                            gradient: LinearGradient(
                              colors: [
                                Colors.orange.shade300,
                                Colors.orange.shade500,
                              ],
                            ),
                            badge: appState.isWakeAlarmSet
                                ? const Icon(
                                    Icons.check_circle,
                                    color: Colors.white,
                                    size: 20,
                                  )
                                : null,
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) => const WakeAlarmScreen(),
                                ),
                              );
                            },
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),

              // Footer
              const Padding(
                padding: EdgeInsets.only(bottom: 24.0),
                child: Text(
                  'Rest well, wake gently',
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.white54,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final Gradient gradient;
  final VoidCallback onTap;
  final Widget? badge;

  const _FeatureCard({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.gradient,
    required this.onTap,
    this.badge,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(24),
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            gradient: gradient,
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.2),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Row(
            children: [
              // Icon
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(
                  icon,
                  size: 40,
                  color: Colors.white,
                ),
              ),

              const SizedBox(width: 20),

              // Text
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          title,
                          style: const TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        if (badge != null) ...[
                          const SizedBox(width: 8),
                          badge!,
                        ],
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      subtitle,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.white.withOpacity(0.9),
                      ),
                    ),
                  ],
                ),
              ),

              // Arrow
              Icon(
                Icons.arrow_forward_ios,
                color: Colors.white.withOpacity(0.6),
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
