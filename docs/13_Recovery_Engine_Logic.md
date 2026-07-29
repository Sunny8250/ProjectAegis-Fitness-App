Project Aegis – Recovery Engine Logic

Version: 1.0

1. Purpose

The Recovery Engine determines how prepared the athlete is for training on a given day.

It analyses recovery, fatigue, pain, recent workload, and cricket activities to generate safe and effective training recommendations.

The engine has three objectives:

Prevent injury
Maximise long-term progress
Recommend the right workout for the day

2. Engine Inputs

The Recovery Engine collects:

Sleep Hours
Sleep Quality
Energy Level
Mood
Muscle Soreness
Pain Scores
Yesterday's Workout
Bowling Load
Running Load
Strength Load
Match Played
Current Training Streak
Previous Recovery Scores

3. Body Region Assessment

Each body region is rated from 0–10.

Region Scale
Neck 0–10
Shoulders 0–10
Upper Back 0–10
Lower Back 0–10
Hips 0–10
Knees 0–10
Calves 0–10

Pain scale:

0 = No pain
1–3 = Mild
4–6 = Moderate
7–8 = High
9–10 = Severe

4. Sleep Assessment

Collect:

Hours slept
Sleep quality (1–5)

Hours score:

Hours Score
≥8 100
7–7.9 90
6–6.9 75
5–5.9 55
<5 35

Quality score:

Rating Score
5 100
4 80
3 60
2 40
1 20

5. Energy Assessment

User rates energy:

Rating Score
Very High 100
High 85
Normal 70
Low 45
Very Low 20

6. Mood Assessment

Mood affects training readiness.

Mood Score
Excellent 100
Good 85
Neutral 65
Poor 40
Very Poor 20

Mood should not override safety rules but can influence recommendations.

7. Soreness Assessment

Overall soreness:

Rating Score
None 100
Mild 85
Moderate 60
High 35
Severe 15

8. Cricket Workload

Yesterday's activities:

Bowling
Batting
Sprinting
Gym
Match

Each contributes to fatigue.

Example workload guide:

Activity Low Medium High
Bowling 10 25 40
Strength 10 20 35
Running 10 20 35
Match 20 35 50

The Training Load Engine provides the final workload value.

9. Recovery Score Formula

Recovery Score is calculated out of 100.

Suggested weighting:

Factor Weight
Sleep 25%
Energy 20%
Pain 25%
Soreness 15%
Training Load 10%
Mood 5%

Clamp the result between 0 and 100.

10. Pain Rules

Safety overrides all other scores.

If any body region ≥8:

Do not schedule strength training.
Do not schedule sprint training.
Recommend recovery programme.

If pain ≥9:

Display a message advising the user to consider seeking professional medical assessment if symptoms are severe, worsening, or persistent.
Disable high-intensity training recommendations.

11. Special Cricket Rules
    Bowling Yesterday

If heavy bowling workload:

Reduce lower-body loading.
Increase calf mobility.
Increase shoulder recovery.
Increase trunk mobility.
Match Yesterday

Prioritise:

Recovery
Mobility
Walking
Hydration reminders

12. Recovery Zones
    Score Zone Recommendation
    90–100 Excellent Full training
    75–89 Good Moderate to hard training
    60–74 Fair Moderate training
    40–59 Low Recovery & mobility
    <40 Poor Recovery only

13. Readiness Score

Recovery and readiness are related but different.

Recovery measures physical state.

Readiness measures ability to perform today.

Example factors:

Recovery Score +
Today's Schedule +
Training Load +
Pain Rules
↓
Readiness Score

14. Decision Tree
    Recovery Check
    ↓
    Calculate Recovery Score
    ↓
    Apply Pain Safety Rules
    ↓
    Apply Cricket Rules
    ↓
    Calculate Readiness
    ↓
    Select Workout Category
    ↓
    Generate Today's Plan

15. Coach Messages

Examples:

Excellent

"You're well recovered today. A full training session is appropriate."

Good

"Recovery looks good. Focus on quality movement and good technique."

Fair

"Let's train, but keep today's intensity under control."

Low

"Your body is asking for recovery. Mobility and light movement will help."

Poor

"Today's priority is recovery. Restoring movement now supports better performance later."

16. Injury Prevention Rules

Always prioritise:

Pain
Recovery
Training Load
Performance

Performance must never override safety.

17. Trend Analysis

Track:

7-day recovery average
28-day recovery average
Best recovery day
Lowest recovery day
Average pain by body region
Average sleep duration

Use trends to personalise future recommendations.

18. Edge Cases
    User skips recovery check

Use the previous day's data with reduced confidence and prompt the user to complete today's check before beginning a high-intensity session.

First launch

Use a conservative introductory workout.

Multiple days inactive

Restart with a lighter programme before returning to normal progression.

19. Future Improvements

Version 2 may include:

Heart rate
Heart rate variability
Resting heart rate
Sleep tracker integration
Wearable device support
Health Connect / Apple Health integration

20. Recovery Engine Rules

The engine must:

Never ignore high pain scores.
Always favour injury prevention over performance.
Adapt recommendations daily.
Explain recommendations in simple language.
Learn from recovery trends over time.
