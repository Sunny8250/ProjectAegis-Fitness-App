Project Aegis – Data Access & API Abstraction

Version: 1.0

1. Purpose

This document defines how Project Aegis accesses data.

Version 1 stores everything locally in SQLite, but the architecture must support future additions such as:

Cloud backup
Device synchronisation
AI Coach
Health Connect
Apple Health
Web dashboard
Multi-device support

The business logic must never know where the data comes from.

2. Architecture
   UI
   │
   ▼
   Business Engines
   │
   ▼
   Services
   │
   ▼
   Repositories
   │
   ▼
   Data Source
   │
   ├── SQLite (V1)
   ├── Cloud API (Future)
   ├── Health Connect
   └── Apple Health

The engines communicate only with services and repositories.

3. Core Principle

The app should depend on interfaces, not implementations.

Example:

Workout Engine

↓

WorkoutRepository

↓

SQLite Repository

Later:

Workout Engine

↓

WorkoutRepository

↓

Cloud Repository

The Workout Engine never changes.

4. Repository Interfaces

Each repository exposes only business operations.

Repositories include:

AthleteRepository
ExerciseRepository
WorkoutRepository
RecoveryRepository
TrainingLoadRepository
AnalyticsRepository
SettingsRepository
NotificationRepository

5. Athlete Repository

Responsibilities:

Load athlete profile
Save profile
Update profile
Read equipment
Save equipment

The UI never accesses SQLite directly.

6. Workout Repository

Responsibilities:

Create workout session
Save workout progress
Resume workout
Complete workout
Retrieve workout history

7. Recovery Repository

Responsibilities:

Save recovery check
Retrieve recovery history
Calculate trends
Update readiness records

8. Exercise Repository

Responsibilities:

Retrieve exercise library
Filter exercises
Search exercises
Load exercise details
Load progression chain

9. Analytics Repository

Responsibilities:

Weekly summaries
Monthly summaries
Recovery trends
Personal records
Achievement progress

10. Service Layer

Services coordinate business workflows.

Examples:

RecoveryService

↓

RecoveryRepository

↓

SQLite

The service contains workflow logic.

The repository performs storage operations.

11. Data Source Layer

Version 1

SQLite

Version 2

SQLite

-

Cloud Sync

Version 3

SQLite

-

Cloud

-

Health Connect

No business logic changes should be required.

12. Offline First Rules

SQLite is always the source of truth.

If future cloud sync exists:

SQLite

↓

Cloud Synchronisation

The app should remain fully usable without an internet connection.

13. Future Synchronisation

Possible flow:

Local Update

↓

Mark Pending Sync

↓

Internet Available

↓

Upload Changes

↓

Resolve Conflicts

↓

Mark Synced

This is not implemented in Version 1 but the architecture should allow it.

14. Health Connect Integration

Future data:

Steps
Walking distance
Exercise sessions
Sleep duration
Heart rate

The Recovery Engine may use this information if permission is granted.

15. Apple Health Integration

Future support:

Sleep
Heart rate
Activity
Workouts
Recovery metrics

The integration should remain optional.

16. AI Coach Integration

Future architecture:

Workout History

↓

Recovery Trends

↓

AI Coach Service

↓

Personalised Advice

The AI Coach should consume existing repositories rather than bypass them.

17. Web Dashboard

Future architecture:

SQLite

↓

Cloud

↓

Web Dashboard

The mobile app remains the primary source of user interaction.

18. Error Handling

Repository methods should return structured results.

Each operation should clearly indicate:

Success
Failure
Validation error
Storage error

Avoid throwing uncaught exceptions to the UI.

19. Conflict Resolution

Future synchronisation rules:

If the same record changes in two places:

Detect conflict.
Compare timestamps.
Preserve user data.
Resolve automatically where safe.
Request user confirmation if required.

Version 1 does not need conflict handling.

20. Security Principles

Future online features should:

Encrypt communication.
Authenticate users securely.
Validate all incoming data.
Avoid storing secrets in source code.
Follow the principle of least privilege.

21. API Design Principles (Future)

Future APIs should be:

RESTful or GraphQL.
Versioned.
Backward compatible.
Well documented.
Strongly typed.
Idempotent where appropriate.

22. Future Repository Expansion

Potential repositories:

CloudBackupRepository
HealthRepository
WearableRepository
AICoachRepository
SyncRepository

These should plug into the existing architecture without changing the business engines.

23. Testing Strategy

Every repository implementation should pass the same tests.

Example:

WorkoutRepository Tests

↓

SQLite Implementation

✓ Pass

↓

Future Cloud Implementation

✓ Pass

Using common test cases ensures consistent behaviour regardless of the storage backend.

24. Guiding Principles

The data layer must:

Be replaceable.
Be testable.
Be modular.
Support offline-first behaviour.
Minimise coupling between business logic and storage.
