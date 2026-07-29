Project Aegis – Component Library

Version: 1.0

1. Purpose

The Component Library defines every reusable UI component in Project Aegis.

Goals:

Consistent UI across the app.
Reusable components.
Easy maintenance.
Faster AI-assisted development.
Accessibility by default.

Rule: Never create a new component if an existing one can be reused.

2. Component Hierarchy
   App
   │
   ├── Layout
   │ ├── Screen
   │ ├── Header
   │ ├── Bottom Navigation
   │ └── Safe Area
   │
   ├── Common
   │ ├── Button
   │ ├── Card
   │ ├── Badge
   │ ├── Chip
   │ ├── Divider
   │ ├── Avatar
   │ └── Icon
   │
   ├── Forms
   │ ├── Text Input
   │ ├── Slider
   │ ├── Toggle
   │ ├── Picker
   │ └── Pain Selector
   │
   ├── Workout
   │ ├── Exercise Card
   │ ├── Exercise Video
   │ ├── Timer
   │ ├── Rest Timer
   │ ├── Workout Stepper
   │ └── Progress Ring
   │
   ├── Analytics
   │ ├── Line Chart
   │ ├── Bar Chart
   │ ├── Weekly Card
   │ ├── Statistic Tile
   │ └── Achievement Card
   │
   └── Feedback
   ├── Loading Skeleton
   ├── Empty State
   ├── Error State
   └── Coach Message
3. Naming Convention

Every component should use PascalCase.

Examples:

PrimaryButton
WorkoutCard
ExerciseCard
RecoveryCard
CoachMessage
ProgressRing
LoadingSkeleton

One component per file.

4. PrimaryButton
   Purpose

Main call-to-action.

Examples:

Start Workout
Save
Continue
Props
title: string
onPress: () => void
disabled?: boolean
loading?: boolean
icon?: ReactNode
fullWidth?: boolean
States
Default
Pressed
Loading
Disabled

Height:

48px

Border Radius:

12px

5. SecondaryButton

Outlined button.

Used for:

Cancel
Skip
Back
View Details

6. IconButton

Circular icon button.

Examples:

Play
Pause
Next
Previous
Settings

Sizes:

Small
Medium
Large

7. Card Component

Base card inherited by:

Recovery Card
Workout Card
Statistic Card
Coach Card
Exercise Card

Props

title: string
subtitle?: string
children: ReactNode
icon?: ReactNode

8. RecoveryCard

Displays:

Recovery Score
Readiness
Pain Summary
Coach Recommendation

Example

Recovery Score

82

Ready for Strength Training

9. WorkoutCard

Displays:

Workout Name
Duration
Difficulty
Equipment
Start Button

10. ExerciseCard

Displays:

Exercise Image
Exercise Name
Sets
Reps
Time
Difficulty

Supports:

Favourite
Completed
Locked

11. CoachMessage

Purpose

Displays intelligent coaching advice.

Props

message: string

type:
"info"
"warning"
"success"
"recovery"

Example

"Your calves are still recovering. We'll reduce sprint volume today."

12. StatisticTile

Displays one metric.

Examples

Recovery

82%

Streak

12 Days

Workouts

56

13. ProgressRing

Used for

Recovery
Workout Completion
Weekly Goal

Animation:

Smooth 500ms progress animation.

14. ProgressBar

Linear progress.

Examples

Workout

Exercise

Recovery Trend

15. ExerciseVideo

Features

Play
Pause
Replay
Full Screen
Mute

Fallback:

Show exercise image if video unavailable.

16. WorkoutStepper

Shows:

Exercise 4 of 8

● ● ● ● ○ ○ ○ ○

Animated transition between exercises.

17. Timer

Displays

Countdown
Elapsed Time
Circular Animation

Modes

Workout

Rest

Hold

Breathing

18. RestTimer

Specialised timer.

Displays:

Next Exercise

Remaining Rest

Skip Button

Add 15 Seconds Button

19. PainSelector

Interactive body pain input.

Regions

Neck
Shoulder
Upper Back
Lower Back
Hips
Knees
Calves

Scale

0–10

20. RecoverySelector

Questions

Sleep
Energy
Mood
Soreness

Produces structured recovery data.

21. Input Components

Includes:

Text Input
Number Input
Date Picker
Dropdown
Search Input

Every input supports:

Label
Helper Text
Error Text
Disabled State

22. LoadingSkeleton

Use instead of blank loading screens.

Variants

Card
List
Chart
Exercise
Dashboard

23. EmptyState

Examples

History

"No workouts completed yet."

Library

"No exercises found."

Analytics

"Complete a few workouts to unlock insights."

24. ErrorState

Displays

Friendly error message
Retry button
Optional illustration

Never expose technical error details.

25. AchievementCard

Displays

Icon
Title
Description
Date Unlocked
Progress

Supports:

Locked
In Progress
Unlocked

26. WeeklyChart

Shows

Recovery Trend
Training Load
Workout Minutes
Consistency

Supports pinch-to-zoom if needed in future versions.

27. Accessibility Rules

Every component must:

Support screen readers.
Have a minimum touch target of 44 × 44 px.
Provide meaningful accessibility labels.
Support dynamic text sizing where practical.
Have sufficient colour contrast. 28. Performance Rules

Components should:

Avoid unnecessary re-renders.
Accept only required props.
Memoise expensive calculations where beneficial.
Lazy-load media assets such as videos.

29. AI Development Rules

Before creating a component, verify:

Does an equivalent already exist?
Can the existing component be extended with props?
Will this component be reused at least twice?

If the answer is no, avoid creating a new reusable component.

30. Component Inventory (Version 1)
    Category Components
    Layout 4
    Buttons 3
    Cards 6
    Forms 8
    Workout 8
    Analytics 5
    Feedback 5
    Navigation 3

Target total: ~40 reusable components.
