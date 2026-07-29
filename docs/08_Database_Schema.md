Project Aegis – SQLite Database Schema

Version: 1.0

1. Database Overview

Database Engine:

SQLite

Architecture:

Offline First
Single User
Local Storage Only
No Cloud

Database Name

project_aegis.db

2. Entity Relationship Diagram
   Athlete
   │
   ├──────────────┐
   │ │
   Recovery Logs Workout Sessions
   │ │
   │ ├─────────────┐
   │ │ │
   Training Load Exercise Logs Workout Programmes
   │ │
   │ │
   └──────────────Exercises─────┘

3. athletes

Stores athlete profile.

id INTEGER PRIMARY KEY

name TEXT

date_of_birth TEXT

height REAL

weight REAL

dominant_hand TEXT

batting_style TEXT

bowling_style TEXT

playing_role TEXT

experience_level TEXT

created_at TEXT

updated_at TEXT

Only one record exists.

4. equipment

Stores available equipment.

id INTEGER PRIMARY KEY

equipment_name TEXT

available INTEGER

Example

Yoga Mat

Resistance Band

Foam Roller

Dumbbells

Bench

5. exercises

Master exercise table.

id TEXT PRIMARY KEY

name TEXT

category TEXT

subcategory TEXT

difficulty INTEGER

equipment TEXT

duration INTEGER

video_path TEXT

thumbnail_path TEXT

description TEXT

6. exercise_tags

Many-to-many tags.

id INTEGER PRIMARY KEY

exercise_id TEXT

tag TEXT

Example

Recovery

Bowling

Core

Mobility

7. exercise_details

Stores coaching information.

exercise_id TEXT PRIMARY KEY

benefits TEXT

coaching_cues TEXT

common_mistakes TEXT

contraindications TEXT

progression TEXT

regression TEXT

8. workout_programmes

Master programme table.

programme_id TEXT PRIMARY KEY

name TEXT

category TEXT

goal TEXT

duration INTEGER

difficulty INTEGER

9. workout_programme_exercises

Links workouts and exercises.

id INTEGER PRIMARY KEY

programme_id TEXT

exercise_id TEXT

exercise_order INTEGER

sets INTEGER

reps INTEGER

hold_seconds INTEGER

rest_seconds INTEGER

10. recovery_logs

Daily recovery check.

id INTEGER PRIMARY KEY

date TEXT

neck INTEGER

shoulder INTEGER

upper_back INTEGER

lower_back INTEGER

hips INTEGER

knees INTEGER

calves INTEGER

energy INTEGER

sleep_hours REAL

bowled INTEGER

match INTEGER

gym INTEGER

running INTEGER

recovery_score INTEGER

readiness_score INTEGER

11. workout_sessions

Stores completed workouts.

session_id TEXT PRIMARY KEY

date TEXT

programme_id TEXT

duration INTEGER

recovery_score INTEGER

pain_before INTEGER

pain_after INTEGER

completed INTEGER

notes TEXT

12. exercise_logs

Every completed exercise.

id INTEGER PRIMARY KEY

session_id TEXT

exercise_id TEXT

sets_completed INTEGER

reps_completed INTEGER

hold_completed INTEGER

difficulty_rating INTEGER

pain_rating INTEGER

13. training_load

Tracks accumulated workload.

id INTEGER PRIMARY KEY

date TEXT

bowling_load INTEGER

strength_load INTEGER

mobility_load INTEGER

walking_load INTEGER

running_load INTEGER

match_load INTEGER

daily_load INTEGER

weekly_load INTEGER

monthly_load INTEGER

14. achievements
    id INTEGER PRIMARY KEY

achievement_name TEXT

date_unlocked TEXT

completed INTEGER

15. personal_records
    id INTEGER PRIMARY KEY

record_name TEXT

record_value REAL

record_date TEXT

Examples

Longest Plank

Longest Side Plank

Push-ups

Streak

16. notifications
    id INTEGER PRIMARY KEY

title TEXT

body TEXT

notification_time TEXT

enabled INTEGER

17. settings
    id INTEGER PRIMARY KEY

dark_mode INTEGER

notifications INTEGER

sounds INTEGER

haptics INTEGER

units TEXT

language TEXT

18. workout_resume

Allows recovery after app interruption.

id INTEGER PRIMARY KEY

session_id TEXT

current_exercise INTEGER

current_set INTEGER

current_rep INTEGER

remaining_time INTEGER

paused INTEGER

19. Indexes

Create indexes for faster performance.

CREATE INDEX idx_recovery_date

CREATE INDEX idx_workout_date

CREATE INDEX idx_exercise_logs

CREATE INDEX idx_training_load

20. Relationships
    Athlete
    │
    ├── Recovery Logs
    │
    ├── Workout Sessions
    │ │
    │ ├── Exercise Logs
    │ │
    │ └── Workout Programme
    │
    ├── Personal Records
    │
    ├── Training Load
    │
    └── Achievements

21. Backup Strategy

Version 1

Local SQLite database
Manual export
Manual restore

Version 2

Cloud backup
Automatic sync

22. Database Rules

Every table must:

Use primary keys.
Use foreign keys where applicable.
Store timestamps.
Never duplicate data.
Support offline operation.
Preserve historical records.

23. Expected Database Size

Estimated Version 1:

Table Approximate Rows
Exercises 60–70
Workout Programmes 15
Recovery Logs Unlimited
Workout Sessions Unlimited
Exercise Logs Unlimited
Training Load Unlimited
Personal Records 20–30
Achievements 20–40

SQLite can comfortably handle this.
