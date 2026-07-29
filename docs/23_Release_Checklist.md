Project Aegis – Release Checklist

Version: 1.0

1. Purpose

The Release Checklist ensures every version of Project Aegis is:

Stable
Secure
Performant
Accessible
Consistent
Ready for users

No release should skip this checklist.

2. Release Types
   Development Build

Purpose:

Daily development
Internal testing
Feature validation
Beta Build

Purpose:

End-to-end testing
Bug verification
Performance testing
Production Release

Purpose:

Stable public release
Fully tested
Version tagged

3. Versioning

Use Semantic Versioning.

Examples:

1.0.0

Major.Minor.Patch
Major

Breaking changes.

Example:

2.0.0

Minor

New features.

Example:

1.3.0

Patch

Bug fixes.

Example:

1.3.2

4. Code Quality Checklist

Before release:

All TypeScript errors resolved.
No ESLint errors.
No unused imports.
No console logs.
No commented-out production code.
No TODOs that affect functionality.
Consistent formatting.

5. Build Verification

Confirm:

Development build succeeds.
Android release build succeeds.
No build warnings that affect functionality.
Assets load correctly.
Fonts display correctly.

6. Database Validation

Verify:

SQLite schema matches the current version.
Migrations execute successfully.
Existing user data is preserved.
Backup and restore work correctly.
Indexes exist where expected.

7. Functional Testing

Test every major workflow:

Onboarding
Recovery Check
Workout Generation
Exercise Player
Workout Completion
History
Analytics
Achievements
Settings
Notifications

No critical workflow should fail.

8. Recovery Engine Testing

Verify:

Recovery score calculation.
Pain rules.
Sleep influence.
Readiness recommendation.
Injury safeguards.
Coach messages.

Confirm recommendations change appropriately with different inputs.

9. Workout Engine Testing

Verify:

Correct programme selection.
Warm-up generation.
Main workout generation.
Cool-down generation.
Progression rules.
Regression rules.
Cricket-specific adaptations.

10. Notification Testing

Confirm:

Permission request.
Morning reminder.
Workout reminder.
Evening reminder.
Streak reminder.
Weekly summary.
Monthly summary.
Quiet hours.
Notification cancellation.

11. Analytics Testing

Verify:

Recovery trends.
Workout summaries.
Personal records.
Achievement progress.
Charts.
Weekly reports.
Monthly reports.

Analytics should remain accurate after app restarts.

12. Accessibility Checklist

Verify:

Screen reader labels.
Sufficient colour contrast.
Scalable text.
Touch targets meet minimum size.
Logical keyboard navigation (where applicable).
Icons accompanied by text where needed.

13. Performance Checklist

Targets:

Cold start < 3 seconds.
Screen transitions < 300 ms.
Workout generation < 1 second.
Recovery calculation < 500 ms.
Smooth 60 FPS animations on supported devices.

14. Offline Validation

Confirm:

App launches without internet.
Workouts function offline.
Recovery logs save offline.
Analytics remain available.
Notifications continue to work.
No unnecessary network requests.

15. Data Integrity

Verify:

No duplicate workout sessions.
No duplicate achievements.
Accurate timestamps.
Correct workout history.
Personal records update correctly.

16. Security Checklist

Ensure:

No secrets stored in source code.
Sensitive data stored securely.
User data remains on-device in Version 1.
Input validation is applied.
Error messages do not expose internal details.

17. UI & UX Review

Review every screen for:

Consistent spacing.
Correct typography.
Proper alignment.
Responsive layouts.
Loading states.
Empty states.
Error states.
Animation quality.

18. Content Review

Verify:

Coach messages are consistent.
Exercise instructions are accurate.
Grammar and spelling are correct.
Notification copy matches the style guide.
Achievement descriptions are clear.

19. Device Testing

Test on:

Small Android phones.
Large Android phones.
Tablets (if supported).

Check:

Portrait orientation.
Different screen densities.
Light and dark themes (if applicable).

20. Regression Testing

After every major change:

Verify that existing features still work.

Examples:

Workout completion.
Recovery history.
Notifications.
Analytics.
Settings.
Database migration.

21. Backup Verification

Confirm:

Backup creation succeeds.
Restore process succeeds.
Data remains intact after restoration.
Version compatibility is maintained.

22. Documentation Review

Ensure all documentation is updated:

PRD
Architecture
Database schema
Migration notes
Change log
User guide (if applicable)

23. Release Approval

A release is ready only if:

All critical bugs are resolved.
All required tests pass.
No blocker issues remain.
Documentation is current.
Version number is updated.

24. Post-Release Monitoring

After release:

Monitor crash reports (future cloud integration).
Track performance.
Verify notification scheduling.
Check database integrity.
Review user feedback.
Prioritise bug fixes.

25. Rollback Plan

If a critical issue is discovered:

Stop further releases.
Identify the root cause.
Restore the previous stable version if necessary.
Fix the issue.
Re-test affected areas.
Publish a patch release.

26. Definition of Release Success

A successful release:

Installs correctly.
Launches reliably.
Preserves user data.
Performs smoothly.
Provides a consistent coaching experience.
Meets all quality standards defined in the project documentation.
