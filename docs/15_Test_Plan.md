Project Aegis – Test Plan

Version: 1.0

1. Purpose

This document defines the testing strategy for Project Aegis.

Objectives:

Prevent regressions
Ensure reliability
Verify business logic
Validate user experience
Guarantee offline functionality

Every feature must pass the required tests before being considered complete.

2. Testing Pyramid
   Manual Testing
   ▲
   Integration Testing
   ▲
   Unit Testing

The majority of tests should be unit tests, followed by integration tests, with manual testing validating the complete user experience.

3. Unit Testing

Unit tests verify individual functions and engines.

Recovery Engine

Test:

Recovery score calculation
Pain weighting
Sleep weighting
Energy weighting
Recovery zones
Coach recommendations
Workout Engine

Test:

Programme selection
Exercise filtering
Warm-up generation
Cooldown generation
Progression
Regression
Rest calculations
Progression Engine

Test:

Progress rules
Regression rules
Deload logic
Exercise replacement
Training Load Engine

Test:

Daily load
Weekly load
Monthly load
Acute workload
Rolling averages
Analytics Engine

Test:

Weekly summary
Monthly trends
Personal records
Achievement calculations

4. Database Testing

Verify:

Table creation
Foreign key constraints
Insert operations
Update operations
Delete operations
Transactions
Rollbacks
Database migrations

5. Repository Testing

Repositories should be tested independently.

Example:

Save Workout

↓

Retrieve Workout

↓

Verify Data

↓

Delete Workout

↓

Verify Removal

6. Service Testing

Services should verify business workflows.

Examples:

Save recovery check
Build workout
Complete workout
Update training load
Schedule notifications

7. Integration Testing

Verify complete workflows.

First Launch

Expected:

Database created
Athlete profile initialised
Onboarding displayed
Daily Recovery Flow

Steps:

Open app
Complete recovery check
Generate workout
Verify recommendation
Workout Flow

Steps:

Start workout
Complete exercises
Finish workout
Save results
Update analytics
Resume Workout

Steps:

Start workout
Close app
Reopen app
Resume correctly

8. UI Testing

Every screen should be tested for:

Layout
Navigation
Empty states
Loading states
Error states
Dark mode
Landscape support (where applicable)

9. Navigation Testing

Verify:

Bottom navigation
Back navigation
Deep links (future)
Screen state preservation

10. Offline Testing

Critical requirement.

Verify:

Workout generation
Exercise videos
Database reads
Database writes
Analytics
Notifications
History

No internet should be required.

11. Performance Testing

Target metrics:

Metric Target
App launch < 2 seconds
Screen transition < 300 ms
Workout generation < 500 ms
Database query < 50 ms
Scroll performance 60 FPS

12. Accessibility Testing

Verify:

Touch targets ≥ 44 × 44 px
Screen reader labels
Colour contrast
Dynamic text scaling
Focus order
Keyboard navigation (future platforms)

13. Error Handling Tests

Test scenarios:

Database unavailable
Corrupted session
Missing exercise video
Invalid recovery data
Invalid settings
Unexpected app closure

The app should recover gracefully without data loss.

14. Edge Case Testing
    First Workout
    No history
    No recovery trends
    Default programme generated
    High Pain
    Pain = 9
    Recovery-only workout recommended
    Excellent Recovery
    Recovery = 95
    Strength programme recommended
    Poor Sleep
    Sleep = 4 hours
    Reduced workload
    Skipped Workout
    Training plan adjusts without breaking progression
    Long Break
    User inactive for 14+ days
    Return with introductory programme

15. Workout Player Testing

Verify:

Exercise timer
Rest timer
Pause
Resume
Skip exercise
Replace exercise
Finish workout

16. Analytics Testing

Verify:

Weekly charts
Monthly charts
Recovery trends
Workout history
Achievement progress
Personal records

17. Notification Testing

Verify:

Morning reminder
Workout reminder
Recovery reminder
Notification permissions
Quiet hours
Duplicate notification prevention

18. Regression Testing

Every new feature must confirm:

Existing screens still work
Database remains compatible
Previous workouts remain accessible
Recovery calculations remain correct
No visual regressions

19. Manual Test Checklist

Before each release:

Launch app
Complete onboarding
Complete recovery check
Start workout
Pause workout
Resume workout
Complete workout
View analytics
Open history
Change settings
Enable dark mode
Restart app
Verify saved data

20. Beta Release Checklist

Before Version 1.0:

No crashes during common workflows
All planned features implemented
Offline functionality verified
Recovery Engine validated
Workout Engine validated
Documentation updated
Performance targets achieved

21. Bug Severity Levels
    Severity Description Action
    Critical Data loss, app crash, unsafe recommendation Fix before release
    High Major feature unusable Fix before release
    Medium Incorrect behaviour with workaround Schedule for next patch
    Low Cosmetic or minor UI issue Fix when practical

22. Acceptance Criteria

A feature is complete only when:

Functional requirements met
Unit tests pass
Integration tests pass
Manual testing completed
No critical or high-severity defects
Documentation updated if behaviour changed

23. Test Data

Maintain reusable test scenarios for:

New athlete
Returning athlete
High recovery
Low recovery
Neck pain
Lower back pain
Calf soreness
Bowling day
Match day
Rest day

This ensures consistent testing across releases.
