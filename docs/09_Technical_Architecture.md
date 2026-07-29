Project Aegis – Technical Architecture

Version: 1.0

1. Technology Stack
   Mobile Framework
   React Native (Expo)
   TypeScript
   Expo Router
   State Management
   Zustand
   Database
   SQLite (expo-sqlite)
   Animations
   React Native Reanimated
   React Native Gesture Handler
   Forms
   React Hook Form
   Zod
   Charts
   Victory Native XL (or equivalent lightweight library)
   Video
   Expo Video (expo-video)
   Notifications
   Expo Notifications
2. Architecture Pattern

Project Aegis follows Clean Architecture.

Presentation Layer
│
▼
Business Logic Layer (Engines)
│
▼
Service Layer
│
▼
Repository Layer
│
▼
SQLite Database

Each layer has a single responsibility.

3. Folder Structure
   src/

├── app/ # Expo Router routes
│
├── components/
│ ├── common/
│ ├── cards/
│ ├── charts/
│ ├── forms/
│ ├── timers/
│ └── workout/
│
├── screens/
│
├── navigation/
│
├── engines/
│ ├── recovery/
│ ├── workout/
│ ├── movement/
│ ├── progression/
│ ├── trainingLoad/
│ └── analytics/
│
├── repositories/
│
├── services/
│
├── database/
│
├── stores/
│
├── hooks/
│
├── utils/
│
├── constants/
│
├── theme/
│
├── types/
│
├── assets/
│ ├── videos/
│ ├── images/
│ ├── sounds/
│ └── icons/
│
└── tests/

4. Coding Rules

Every file must:

Have a single responsibility.
Export one main component/class.
Use TypeScript.
Be strongly typed.
Avoid duplicated logic.
Keep functions short and readable.

5. File Naming
   Components
   RecoveryCard.tsx
   WorkoutCard.tsx
   ExercisePlayer.tsx
   Hooks
   useRecovery.ts
   useWorkout.ts
   useExercise.ts
   Stores
   athleteStore.ts
   recoveryStore.ts
   workoutStore.ts
   Services
   RecoveryService.ts
   WorkoutService.ts
   DatabaseService.ts

6. Zustand Stores
   athleteStore

Stores:

Athlete Profile
Equipment
Settings
recoveryStore

Stores:

Recovery Check
Recovery Score
Readiness Score
workoutStore

Stores:

Current Workout
Current Exercise
Current Set
Workout Timer
exerciseStore

Stores:

Exercise Library
Exercise Filters
analyticsStore

Stores:

Charts
Weekly Summary
Trends
historyStore

Stores:

Workout History
Recovery History
settingsStore

Stores:

Theme
Units
Notifications
Sounds
Haptics

7. Repository Pattern

Repositories are the only layer that talks to SQLite.

Example:

WorkoutRepository

↓

SQLite

The UI never accesses the database directly.

Repositories:

AthleteRepository
ExerciseRepository
WorkoutRepository
RecoveryRepository
HistoryRepository
SettingsRepository

8. Services

Services coordinate business operations.

Examples:

RecoveryService

Calculate Recovery Score
Validate Recovery Data

WorkoutService

Build Workout
Assign Sets/Reps
Save Session

AnalyticsService

Weekly Report
Progress Trends

NotificationService

Schedule reminders
Cancel reminders

9. Engines

The engines contain all coaching logic.

Recovery Engine

Input:

Pain
Sleep
Energy

Output:

Recovery Score
Training Load Engine

Input:

Workout history
Bowling load
Match load

Output:

Daily / Weekly Load
Workout Engine

Input:

Recovery Score
Training Load
Exercise Database

Output:

Today's Workout
Progression Engine

Input:

Previous sessions
Pain
Recovery

Output:

Progress / Maintain / Deload
Analytics Engine

Input:

History

Output:

Charts
Weekly reports
Coach insights

10. Custom Hooks
    useRecovery()

useWorkout()

useExercise()

useTimer()

useNotifications()

useAnalytics()

Hooks manage reusable UI behaviour.

11. Error Handling

Every database operation must:

Use try/catch.
Return typed results.
Log errors in development.
Show user-friendly messages.

Never crash the app.

12. Offline Rules

Everything must work without internet:

Videos
Database
Charts
Progress
Workout generation
Notifications

13. Performance Rules

Target:

App launch < 2 sec
Screen transitions < 300 ms
Workout generation < 500 ms
Database queries < 50 ms
Smooth 60 FPS animations

14. Security Rules
    No external API calls in Version 1.
    No user accounts.
    No analytics SDKs.
    Store all data locally.
    Validate user input before saving.

15. Code Quality Standards

Every pull request (or AI-generated feature) should meet these standards:

No TypeScript errors.
No lint errors.
No unused code.
No duplicate logic.
Clear naming.
Proper comments for complex logic only.

16. Testing Strategy
    Unit Tests
    Recovery Engine
    Workout Engine
    Progression Engine
    Training Load Engine
    Integration Tests
    Database operations
    Workout generation
    Workout completion
    Manual Testing
    First launch
    Interrupted workout
    Resume workout
    Recovery check
    Complete workout
    Dark mode
    Offline mode

17. Dependency Rules

Allowed direction of dependencies:

Screens
↓
Components
↓
Hooks
↓
Services
↓
Repositories
↓
SQLite

Business engines can call repositories and services.

Repositories must never import UI components.

18. AI Coding Rules

When using Claude or another coding assistant:

Implement one feature at a time.
Never modify unrelated files.
Follow this architecture exactly.
Reuse existing components.
Add tests where appropriate.
Preserve backward compatibility.
Do not introduce new libraries unless necessary. 19. Future Scalability

The architecture should support future additions without major refactoring:

AI Coach
Cloud sync
Wearables
Voice guidance
Multi-user support
Web dashboard
