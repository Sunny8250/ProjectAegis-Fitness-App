Project Aegis – Interaction & Behaviour Specification

Version: 1.0

1. UX Principles

The app should feel like:

A physiotherapist guiding you.
A strength coach planning your progress.
A cricket coach monitoring your workload.

The experience should be:

Calm
Fast
Professional
Encouraging
Automatic

2. User Journey
   Open App
   ↓
   Dashboard
   ↓
   Recovery Check
   ↓
   Workout Generated
   ↓
   Workout Preview
   ↓
   Exercise Player
   ↓
   Workout Complete
   ↓
   Progress Updated
   ↓
   Dashboard

The user should need no more than 3 taps to begin a workout.

3. Splash Screen Behaviour
   Show logo for 1–2 seconds.
   Initialise SQLite.
   Load Athlete Profile.
   Check unfinished workouts.
   Navigate automatically.

If setup isn't complete:

Splash
↓

Onboarding
↓

Athlete Setup

Otherwise:

Splash

↓

Dashboard

4. Dashboard Behaviour

The Dashboard answers only one question:

"What should I do today?"

Display:

Recovery Score
Today's Workout
Coach Insight
Start Button

The Dashboard must never become cluttered.

5. Recovery Check Behaviour

Duration:

20–30 seconds

Questions appear one at a time.

Sequence:

Neck

↓

Shoulders

↓

Upper Back

↓

Lower Back

↓

Calves

↓

Energy

↓

Sleep

↓

Yesterday's Activity

↓

Done

Immediately after completion:

Generating Today's Workout...

6. Workout Generation Animation

Display:

Analysing Recovery...

✓ Pain

✓ Mobility

✓ Cricket Workload

✓ Recovery Score

Creating Workout...

Duration:

2–3 seconds.

7. Workout Preview

Display:

Workout Name
Focus
Duration
Difficulty
Equipment
Exercise List

Buttons:

Start Workout
Back

8. Exercise Player Behaviour

Sequence:

Exercise Opens

↓

Instruction Video Plays

↓

I'm Ready

↓

3

2

1

GO

↓

Exercise Starts

↓

Rep Counter

↓

Rest

↓

Next Set

↓

Next Exercise

No manual navigation between exercises.

9. Video Behaviour
   Auto-play.
   Play once.
   Replay available.
   Landscape supported.
   Fullscreen supported.
   Playback speed:
   0.75×
   1×
   1.25×
10. Countdown Behaviour

Large countdown:

3

2

1

GO

Haptic:

Small vibration each second.
Strong vibration on GO.

11. Rep Counter

Large button.

Tap:

+1 Rep

Long Press:

Undo last rep.

Automatic completion when target reps reached.

12. Hold Timer

Circular timer.

Colours:

Green

↓

Yellow

↓

Orange

↓

Red

Last 3 seconds:

3

2

1

13. Rest Behaviour

Automatic.

Exercise Finished

↓

Rest Timer

↓

Next Set Starts

No button press required.

14. Pause Behaviour

When paused:

Freeze:

Video
Timer
Rep Counter
Workout Timer
Rest Timer

Resume exactly where the user stopped.

15. Incoming Phone Call

If interrupted:

Workout Paused

Resume?

Restart?

Exit?

Never lose progress.

16. App Closed

On next launch:

Workout Detected

Resume Workout

Restart Workout

Discard Workout

17. Workout Complete

Animation:

✓ Workout Complete

Then:

Recovery Updated
Progress Saved
Streak Updated
Personal Record (if applicable)

18. Personal Record

Animation:

🏆

New Personal Record

Side Plank

45 Seconds

Effects:

Confetti
Medium Haptic
Achievement Sound

19. Navigation Behaviour

Bottom tabs remain visible except during workouts.

During a workout:

Prompt before leaving:

Workout in Progress

Continue Workout?

Leave Anyway?

20. Empty States

History

No workouts yet.

Let's complete your first session.

Progress

Complete a few workouts to unlock progress charts.

Achievements

Keep training.

Your first achievement is waiting.

21. Error Handling

Never crash.

If database fails:

Unable to Load Data

Retry

Restore Backup

If video missing:

Skip gracefully and continue workout.

22. Offline Behaviour

Everything must work offline:

Videos
Database
Charts
Workouts
History
Recovery Engine

Internet is never required.

23. Haptic Feedback
    Light
    Button press
    Checkbox
    Toggle
    Medium
    Workout Start
    Workout Complete
    New Record
    Strong
    30-Day Streak
    100 Workouts
    Major Milestones
24. Sound Design

Optional.

Sounds:

Countdown
Rest Finished
Success
Achievement

Default:

Minimal volume.

25. Accessibility

Support:

Large Text
High Contrast
Colour-Blind Friendly UI
Screen Reader Labels
One-Hand Operation

26. Coach Communication Style

Never robotic.

❌ "Task Complete."

✅ "Excellent work. Your mobility session is complete."

❌ "Workout Failed."

✅ "Today's session wasn't completed, but every step counts. Let's continue tomorrow."

27. Smart Recovery Messages

Examples:

"Your recovery score is lower because you bowled yesterday and reported calf tightness. Today's session has been adjusted to prioritise recovery."

"Your sleep improved last night, so today's workout includes slightly more strength work."

28. Daily Reflection

After every workout:

Questions:

How do you feel?
Did any exercise cause pain?
Confidence for tomorrow?

Duration:

Less than 10 seconds.

29. Smart Notifications

Morning:

"Good morning. Your recovery check is ready."

Evening:

"Don't forget your recovery routine."

Weekly:

"Your coach report is available."

Notifications should never feel spammy.

30. Behaviour Rules

Every interaction must:

Reduce user effort.
Preserve progress.
Never lose data.
Feel smooth.
Be predictable.
Support offline usage.
