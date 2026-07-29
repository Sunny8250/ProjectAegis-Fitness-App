Project Aegis – Notification Strategy

Version: 1.0

1. Purpose

The notification system helps the athlete build consistent training habits while avoiding notification fatigue.

Objectives:

Encourage consistency
Improve recovery compliance
Protect training streaks
Deliver timely reminders
Respect the user's schedule

Notifications should always be supportive, never guilt-inducing.

2. Notification Principles

Every notification should be:

Helpful
Timely
Relevant
Actionable
Respectful

Avoid repetitive or excessive notifications.

3. Notification Categories
   Daily
   Recovery Check
   Today's Workout
   Workout
   Workout Ready
   Resume Workout
   Workout Completed
   Recovery
   Evening Recovery
   Mobility Reminder
   Stretch Reminder
   Progress
   Weekly Summary
   Monthly Summary
   New Personal Record
   Achievements
   Streak Milestone
   Achievement Unlocked
   System
   Database Backup (Future)
   App Update
   Migration Completed

4. Daily Recovery Reminder

Purpose:

Encourage the athlete to complete the recovery check before training.

Suggested default:

7:00 AM

Example:

"Good morning. Let's check how you're feeling before today's training."

Shown only once per day.

5. Workout Reminder

Conditions:

Recovery check completed.
Workout not started.

Default:

30–60 minutes after the recovery check, unless the user has set a preferred workout time.

Example:

"Your workout is ready whenever you are."

6. Resume Workout Reminder

Trigger:

Workout paused for more than 30 minutes.

Example:

"You're halfway through today's session. Ready to continue?"

Only one reminder per paused workout.

7. Evening Recovery Reminder

Purpose:

Encourage stretching and mobility.

Default:

7:30 PM

Example:

"A few minutes of recovery today can help tomorrow's performance."

Skip if the user already completed a recovery session.

8. Streak Protection

If today's workout is incomplete and the day is ending:

Example:

"You can still keep your streak alive with a short recovery session."

Never imply failure.

9. Achievement Notifications

Examples:

First Workout

"Congratulations! You've completed your first workout."

Seven-Day Streak

"Seven days of consistency. Great work!"

New Personal Record

"You set a new personal best today."

10. Weekly Coach Report

Default:

Sunday evening.

Includes:

Workouts completed
Recovery average
Weekly consistency
Positive feedback
Focus for next week

Example:

"You completed 5 workouts this week. Let's keep the momentum going."

11. Monthly Summary

Delivered on the first day of the next month.

Highlights:

Total workouts
Recovery trends
Training minutes
Personal records
Achievements unlocked

12. Quiet Hours

Default:

10:00 PM – 7:00 AM

During quiet hours:

No reminders
No streak notifications
No progress updates

Critical system notifications (if introduced in future versions) may still appear if required.

13. Smart Scheduling

The system adapts reminders based on user behaviour.

Examples:

If workouts usually begin around 6:00 PM:

Move reminders closer to 5:30 PM.

If workouts are consistently ignored at a certain time:

Gradually adjust the reminder time.

14. Missed Workout Logic

If a workout is missed:

Do not repeatedly remind the user.

Instead:

Tomorrow's message becomes:

"Let's start fresh today."

Avoid negative wording.

15. Recovery-Based Notifications

Low Recovery:

"Your recovery looks lower today. A lighter session may be the better choice."

Excellent Recovery:

"You're well recovered today. A great opportunity for a quality session."

16. Injury-Aware Notifications

If high pain has been reported recently:

Avoid:

"Time for strength training!"

Instead:

"Today's focus is recovery and movement quality."

17. Notification Frequency

Maximum:

3 scheduled notifications per day.

Recommended:

Morning recovery reminder
Workout reminder
Evening recovery reminder

Achievements and summaries are additional but should remain infrequent.

18. User Controls

Users can enable or disable:

Recovery reminders
Workout reminders
Evening reminders
Achievement notifications
Weekly reports
Monthly summaries

Users can also:

Set preferred workout time
Configure quiet hours
Choose notification sound (if supported)
Enable or disable vibration

19. Future Smart Notifications

Version 2 may include:

Weather-aware training suggestions
Travel reminders
Match-day preparation
Wearable-triggered recovery prompts
AI-generated motivational messages

20. Notification Copy Guidelines

Tone should be:

Positive
Calm
Supportive
Brief
Clear

Avoid:

"You failed."
"You missed another workout."
"You're falling behind."

Prefer:

"Every session counts."
"A short recovery session is still progress."
"Let's keep building consistency."

21. Technical Implementation

Version 1 uses:

Expo Notifications
Local scheduled notifications
Offline scheduling

Notifications should:

Persist after app restarts
Be rescheduled after device reboot (where supported)
Respect user settings immediately after changes

22. Testing Checklist

Verify:

Permission request flow
Scheduling
Cancellation
Quiet hours
Resume reminder
Streak reminder
Weekly report
Monthly report
Notification settings
Time zone changes

23. Success Metrics

The notification system is successful if it:

Improves workout consistency
Increases recovery check completion
Reduces missed sessions
Avoids notification fatigue
Maintains a positive coaching experience
