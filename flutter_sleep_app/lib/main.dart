import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'screens/home_screen.dart';
import 'services/audio_service.dart';
import 'services/alarm_service.dart';
import 'models/app_state.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Hive for local storage
  await Hive.initFlutter();
  await Hive.openBox('settings');

  // Initialize services
  await AlarmService.initialize();
  await SleepAudioService.initialize();

  runApp(const PatientParentingSleepApp());
}

class PatientParentingSleepApp extends StatelessWidget {
  const PatientParentingSleepApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AppState(),
      child: MaterialApp(
        title: 'Patient Parenting Sleep',
        theme: ThemeData(
          primarySwatch: Colors.indigo,
          useMaterial3: true,
          brightness: Brightness.light,
          cardTheme: CardTheme(
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        ),
        darkTheme: ThemeData(
          primarySwatch: Colors.indigo,
          useMaterial3: true,
          brightness: Brightness.dark,
        ),
        home: const HomeScreen(),
      ),
    );
  }
}
