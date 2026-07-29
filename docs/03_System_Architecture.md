Project Aegis – System Architecture

Version: 1.0

1. Architecture Overview

Project Aegis follows a Modular Engine Architecture.

Instead of putting business logic inside screens, every major feature is implemented as an independent engine.

                  User

                    │

                    ▼

           Recovery Check Engine

                    │

                    ▼

      Recovery Intelligence Engine

                    │

                    ▼

         Training Load Engine

                    │

                    ▼

      Workout Recommendation Engine

                    │

                    ▼

    Movement Intelligence Database

                    │

                    ▼

        Workout Generation Engine

                    │

                    ▼

         Exercise Player Engine

                    │

                    ▼

       Progression Engine

                    │

                    ▼

        Analytics Engine

                    │

                    ▼

         SQLite Database

The UI never contains coaching logic.

The UI only displays information.

2. Engine Overview
   Athlete Profile Engine
   Responsibility

Stores permanent athlete information.

Input
Name
Height
Weight
Equipment
Cricket role
Injury history
Output

Athlete Profile

Recovery Check Engine
Responsibility

Collect daily health information.

Input
Neck pain
Upper back pain
Lower back pain
Shoulder pain
Hip pain
Calf pain
Sleep
Energy
Bowling yesterday
Match today
Gym yesterday
Output

Recovery Check Record

Recovery Intelligence Engine
Responsibility

Calculate:

Recovery Score
Readiness Score
Training Recommendation

Uses:

Today's recovery
Previous workouts
Training Load
Pain trends
Training Load Engine

Tracks cumulative stress.

Inputs

Bowling
Strength
Mobility
Match
Walking
Running

Outputs

Daily Load
Weekly Load
Monthly Load
Fatigue Indicator
Movement Intelligence Database

Contains every exercise.

Each exercise includes:

Purpose
Benefits
Contraindications
Progressions
Regressions
Coaching cues
Cricket relevance
Equipment
Target muscles

This is the coaching brain.

Workout Generation Engine

Uses

Recovery

Training Load

Movement Database

↓

Creates today's workout.

Automatically decides:

Exercises
Order
Sets
Reps
Holds
Rest
Exercise Player Engine

Controls

Exercise video
Timer
Rep counter
Rest timer
Countdown
Workout progression
Progression Engine

Tracks

Previous performance
Pain
Recovery
Consistency

Automatically decides

Progress
Maintain
Deload
Regression
Analytics Engine

Generates

Recovery trends
Pain trends
Strength progress
Mobility improvements
Cricket readiness
Weekly reports
Notification Engine

Schedules

Workout reminders
Hydration reminders
Recovery reminders
Weekly review reminders

3. Data Flow

Daily workflow:

App Opens

↓

Load Athlete Profile

↓

Recovery Check

↓

Recovery Intelligence

↓

Training Load Analysis

↓

Generate Workout

↓

Workout Preview

↓

Exercise Player

↓

Workout Complete

↓

Save Session

↓

Update Analytics

↓

Dashboard

4. Folder Structure
   project-aegis/

mobile/

src/

├── app/
├── assets/
│ ├── videos/
│ ├── illustrations/
│ ├── sounds/
│ └── icons/
│
├── components/
│
├── screens/
│
├── navigation/
│
├── database/
│
├── stores/
│
├── hooks/
│
├── services/
│
├── engines/
│ ├── athlete/
│ ├── recovery/
│ ├── trainingLoad/
│ ├── workout/
│ ├── movement/
│ ├── progression/
│ ├── analytics/
│ └── notifications/
│
├── data/
│ ├── exercises/
│ ├── workouts/
│ └── coaching/
│
├── constants/
├── utils/
├── theme/
├── types/
└── tests/

5. State Management

Use Zustand.

Stores:

AthleteStore

RecoveryStore

WorkoutStore

ExerciseStore

AnalyticsStore

HistoryStore

SettingsStore

NotificationStore

Each store has a single responsibility.

6. SQLite Database

Core tables:

athletes
exercises
exercise_tags
exercise_progressions
workout_programs
workout_exercises
workout_sessions
exercise_logs
recovery_logs
training_load
achievements
settings

7. Application Layers
   Presentation Layer
   ↓
   Screens
   ↓
   Components

──────────────────

Business Layer
↓
Recovery Engine
Workout Engine
Training Load Engine
Analytics Engine

──────────────────

Data Layer
↓
SQLite
Static Exercise Data
Workout Data

No screen should directly manipulate the database.

8. Navigation Flow
   Splash

↓

Onboarding

↓

Athlete Setup

↓

Dashboard

↓

Recovery Check

↓

Workout Preview

↓

Exercise Player

↓

Workout Summary

↓

Dashboard

Bottom navigation:

Home
Progress
History
Library
Settings

9. Error Handling

The app must:

Never crash because of missing data.
Save workouts after every completed exercise.
Resume interrupted workouts.
Automatically recover from app restarts where possible.

10. Performance Targets
    Launch time: under 2 seconds.
    Workout generation: under 500 ms.
    Recovery score calculation: under 100 ms.
    Database query: under 50 ms.
    Smooth 60 FPS animations.
    Offline operation at all times.

11. Security
    Local SQLite database only.
    No cloud synchronisation in Version 1.
    No user accounts.
    No analytics tracking.
    No third-party data collection.

12. Future Expansion

The architecture is designed to support future additions without major refactoring, including:

AI Coach
Voice-guided workouts
Smartwatch integration
Cloud backup
Multi-device sync
Multi-user support
Coach dashboard

13. Architecture Principles

Every new feature must follow these rules:

Keep business logic inside engines.
Keep UI components stateless whenever possible.
Use reusable components.
Never duplicate logic.
Keep database access inside services/repositories.
Design for offline-first operation.
