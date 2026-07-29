Project Aegis – Database Migrations

Version: 1.0

1. Purpose

This document defines how the SQLite database schema will evolve over time.

Objectives:

Preserve user data during updates.
Allow new features to be added safely.
Support schema evolution.
Prevent data corruption.
Enable rollback where possible.

2. Migration Principles

Every migration must:

Be repeatable.
Be idempotent (running it twice should not break the database).
Run automatically during app startup.
Complete before the app becomes usable.
Never silently delete user data.

3. Database Versioning

Maintain a schema version.

Example:

Version 1
↓

Version 2
↓

Version 3
↓

Version N

The application should compare:

Current database version
Required application version

If different, execute pending migrations in sequence.

4. Migration Workflow
   Launch App
   ↓
   Open SQLite
   ↓
   Read Schema Version
   ↓
   Compare with App Version
   ↓
   Run Pending Migrations
   ↓
   Validate Schema
   ↓
   Continue Startup
5. Migration File Naming

Each migration should have a unique identifier.

Examples:

001_initial_schema.sql

002_add_notifications.sql

003_add_achievements.sql

004_add_training_load.sql

Never modify an existing migration after release. Create a new migration instead.

6. Migration Structure

Each migration should include:

Migration number
Description
SQL statements
Validation checks
Rollback notes

Example structure:

Migration ID

Description

SQL Changes

Validation

Rollback Strategy

7. Initial Migration

Migration:

001_initial_schema

Creates:

athletes
exercises
workout_programmes
workout_sessions
recovery_logs
exercise_logs
training_load
settings
achievements
personal_records

8. Future Migration Examples

Version 2

002_add_notification_table

Adds:

notifications table

Version 3

003_add_exercise_notes

Adds:

Personal exercise notes

Version 4

004_add_health_connect

Adds:

Wearable synchronisation tables

9. Migration Rules

Allowed:

Add table
Add column
Add index
Add trigger
Add view

Avoid:

Dropping tables containing user data
Renaming tables without migration support
Changing primary keys after release

10. Data Integrity

After every migration:

Verify:

Row counts
Foreign keys
Required tables
Required indexes

If validation fails:

Stop startup
Preserve existing database
Display a recovery message

11. Transactions

Every migration should execute inside a database transaction.

Begin Transaction

↓

Execute SQL

↓

Validate

↓

Commit

↓

Else Rollback

This prevents partially applied migrations.

12. Rollback Strategy

If a migration fails:

Roll back the current transaction.
Keep the previous schema intact.
Log the error (development builds).
Inform the user that the update could not be completed.

Never leave the database in an inconsistent state.

13. Data Preservation Rules

User-generated data must never be removed automatically.

Protected data includes:

Workout history
Recovery logs
Personal records
Achievements
Settings
Athlete profile

If data transformation is required, migrate it rather than deleting it.

14. Index Management

New indexes may be added to improve performance.

Example:

CREATE INDEX idx_workout_date
ON workout_sessions(date);

Indexes should not change application behaviour.

15. Seed Data

Seed data should be version-controlled.

Examples:

Exercise library
Workout programmes
Default settings

Rules:

Insert only if missing.
Never overwrite user-customised data.

16. Schema Validation

On startup, verify:

Required tables exist.
Required columns exist.
Foreign keys are enabled.
Schema version matches the expected version.

If validation fails, stop further database operations.

17. Backup Strategy

Before major migrations:

Create a local backup of the SQLite database.
Store it temporarily until migration succeeds.
Delete the backup after successful validation.

If migration fails, restore from the backup.

18. Testing Migrations

Every migration must be tested against:

A fresh installation.
The previous version.
A database containing realistic user data.
A database with thousands of workout records. 19. Performance Targets

Migration goals:

Operation Target
Schema version check < 10 ms
Small migration < 100 ms
Large migration < 2 seconds
Validation < 100 ms

Users should not notice significant startup delays.

20. Future Compatibility

The migration framework should support:

AI Coach tables
Cloud synchronisation
Health Connect integration
Apple Health integration
Wearable devices
Multi-user support (future)

21. Recovery from Corruption

If corruption is detected:

Attempt database integrity check.
Restore from the latest backup if available.
If recovery fails, allow the user to export any recoverable data before offering a database reset.
Clearly explain the issue in non-technical language.

22. Migration Checklist

Before releasing a migration:

Schema reviewed.
SQL tested.
Rollback verified.
Seed data validated.
Performance tested.
Backup tested.
Documentation updated.
