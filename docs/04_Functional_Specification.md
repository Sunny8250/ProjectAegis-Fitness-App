Project Aegis – Functional Specification

Version: 1.0

1. Navigation Structure
   Splash
   ↓
   Onboarding (First Launch Only)
   ↓
   Athlete Setup (First Launch Only)
   ↓
   Dashboard
   ├── Recovery Check
   ├── Workout Preview
   ├── Exercise Player
   ├── Workout Summary
   ├── Progress
   ├── History
   ├── Exercise Library
   └── Settings

Bottom Navigation:

🏠 Home
📈 Progress
📅 History
📚 Library
⚙️ Settings

Screen 1 – Splash
Purpose

Initialize the application.

Components
Logo
App Name
Loading Indicator
Behaviour
Check database.
Load athlete profile.
Check first launch.
Navigate automatically.

Screen 2 – Onboarding
Purpose

Explain the app.

Pages

Page 1

Recovery Intelligence

Page 2

Workout Automation

Page 3

Cricket Performance

Page 4

Get Started

Button:

Start Setup

Screen 3 – Athlete Setup
Sections
Personal
Name
DOB
Height
Weight
Cricket
Batting Style
Bowling Style
Playing Role
Equipment

Checkboxes

Yoga Mat
Resistance Band
Dumbbells
Foam Roller
Bench
Medical
Previous injuries
Current pain areas
Surgery history
Button

Finish Setup

Screen 4 – Dashboard
Header
Greeting
Today's Date
Recovery Score
Recovery Card

Shows

Recovery Score
Readiness
Pain
Energy
Sleep
Today's Workout Card

Shows

Workout Name
Goal
Duration
Difficulty

Button

START

Quick Stats
Current Streak
Last Workout
Weekly Goal
Coach Insight

Example

"Your calves are recovering well. Today's focus is thoracic mobility and core stability."

Screen 5 – Recovery Check

Maximum duration

30 seconds.

Questions

Pain

Neck
Shoulder
Upper Back
Lower Back
Hips
Knees
Calves

Energy

1–10

Sleep

Hours

Yesterday

Bowled?
Match?
Gym?
Running?

Button

Generate Workout

Screen 6 – Workout Preview

Displays

Workout Name
Estimated Duration
Goal
Recovery Focus
Equipment
Exercise List

Buttons

Start Workout

Back

Screen 7 – Exercise Player
Header

Exercise 2 of 8

Workout Timer

Progress Bar

Exercise Video

Auto Play

Loop

Landscape support

Exercise Details
Name
Sets
Reps
Hold Time
Coaching Tips
Controls

Pause

Skip

Finish

Automatic Flow
Video

↓

Ready

↓

Countdown

↓

Exercise

↓

Rest

↓

Next Exercise

Screen 8 – Rest Screen

Displays

Countdown
Next Exercise
Motivational Tip

Automatically proceeds.

Screen 9 – Workout Summary

Displays

Duration
Exercises Completed
Recovery Score
Pain Before
Pain After
Notes

Buttons

Finish

Share (Future Version)

Screen 10 – Progress

Charts

Recovery Score
Pain Trend
Mobility
Strength
Workout Frequency
Training Load

Filters

Week
Month
Year

Screen 11 – History

Calendar View

Tap Date

Displays

Workout
Exercises
Recovery
Notes

Screen 12 – Exercise Library

Search

Categories

Neck
Shoulder
Spine
Core
Legs
Cricket

Every exercise shows

Video
Difficulty
Equipment

Screen 13 – Exercise Details

Displays

Video
Description
Muscles
Coaching Tips
Common Mistakes
Progressions
Regressions
Personal History

Screen 14 – Personal Records

Displays

Longest Plank
Best Side Plank
Most Workouts
Longest Streak
Highest Recovery Score

Screen 15 – Achievements

Examples

First Workout
7-Day Streak
30-Day Streak
100 Workouts
Pain-Free Week

Screen 16 – Weekly Coach Report

Displays

Weekly Recovery
Pain Summary
Training Load
Progress
Coach Recommendations

Generated automatically every Sunday.

Screen 17 – Settings

Options

Dark Mode
Notifications
Sound
Haptics
Units
Backup
Export
About
User Flow
Open App

↓

Dashboard

↓

Recovery Check

↓

Generate Workout

↓

Workout Preview

↓

Exercise Player

↓

Workout Summary

↓

Dashboard
Primary User Actions
Screen Primary Action
Dashboard Start Workout
Recovery Check Generate Workout
Workout Preview Start Workout
Exercise Player Complete Exercise
Workout Summary Save Session
Progress View Trends
History View Past Workout
Library Learn Exercise
Settings Configure App
Empty States
History

"No workouts completed yet."

Progress

"Complete your first workout to unlock progress tracking."

Achievements

"Your achievements will appear here as you stay consistent."

Error States
Database unavailable
Video missing
Workout generation failed
Storage full

Each should offer a clear retry option and preserve existing data.

Acceptance Criteria

Every screen must:

Open in under 300 ms.
Support dark mode.
Be usable with one hand.
Work completely offline.
Handle missing data gracefully.
Follow the App Constitution.
