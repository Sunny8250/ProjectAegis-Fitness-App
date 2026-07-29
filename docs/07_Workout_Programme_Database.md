Project Aegis – Workout Programme Database

Version: 1.0

1. Purpose

The Workout Programme Database (WPD) contains every workout template available in the app.

The Workout Engine never creates random workouts. It selects the most appropriate programme based on:

Recovery Score
Pain Levels
Training Load
Cricket Schedule
Athlete Progression
Equipment Availability

2. Programme Structure

Each workout programme contains:

Programme ID
Programme Name
Category
Goal
Duration
Difficulty
Recovery Requirement
Equipment
Target Areas
Cricket Phase
Exercise List
Progression Rules
Regression Rules
Completion Criteria

3. Programme Categories
   Recovery
   Morning Spine Reset
   Full Body Recovery
   Evening Mobility
   Neck Recovery
   Lower Back Recovery
   Shoulder Recovery
   Calf Recovery
   Mobility
   Spine Mobility
   Hip Mobility
   Thoracic Mobility
   Full Body Mobility
   Stability
   Core Stability A
   Core Stability B
   Shoulder Stability
   Balance Training
   Strength
   Strength A
   Strength B
   Lower Body Strength
   Upper Body Strength
   Posterior Chain Strength
   Cricket
   Bowling Warm-up
   Bowling Recovery
   Batting Warm-up
   Sprint Preparation
   Match Day Warm-up
   Match Recovery
   Conditioning
   Walking Session
   Sprint Mechanics
   Endurance Circuit

4. Workout Template

Every programme follows this structure.

Programme ID:
WP001

Name:
Morning Spine Reset

Category:
Recovery

Goal:
Reduce morning stiffness

Duration:
20 Minutes

Difficulty:
Easy

Recovery Score Required:
Any

Equipment:
None

Exercises:

- Chin Tuck
- Cat-Cow
- Thread the Needle
- Bird Dog
- Child's Pose
- Box Breathing

Cooldown:
Breathing

Progression:
Increase hold time

Regression:
Reduce repetitions

5. Programme Selection Rules
   Recovery Score 90–100

Recommended

Strength A
Strength B
Sprint Preparation
Bowling Warm-up
Recovery Score 70–89

Recommended

Core Stability
Mobility
Moderate Strength
Recovery Score 50–69

Recommended

Recovery
Mobility
Stability

Avoid

Heavy Strength
Sprinting
Recovery Score Below 50

Only

Recovery
Stretching
Walking
Breathing

No strength training.

6. Pain Rules
   Neck Pain

0–3

Normal programme

4–6

Recovery programme

7–10

Neck Recovery only

Lower Back Pain

0–3

Normal

4–6

Core Stability

Mobility

7–10

Recovery only

Calf Tightness

Replace

Sprint

↓

Walking

Add

Calf Stretch

Foam Roll

Mobility

7. Cricket Schedule Rules
   Match Today

Only

Warm-up
Mobility
Activation
Match Tomorrow

Reduce

Strength Volume

Increase

Recovery

Bowled Yesterday

Reduce

Lower Body Load

Increase

Recovery

Bowling Practice Today

Morning

Activation

Evening

Recovery

8. Programme Progression

Example

Core Stability A

↓

Core Stability B

↓

Strength A

↓

Strength B

↓

Power Development

Progress only if:

Recovery ≥ 80
Pain ≤ 2
Last 3 sessions completed successfully

9. Workout Frequency
   Programme Weekly Frequency
   Morning Spine Reset Daily
   Neck Recovery As Needed
   Core Stability 2–3 Times
   Strength 2 Times
   Mobility 3–5 Times
   Bowling Warm-up Before Bowling
   Bowling Recovery After Bowling
   Sprint Preparation 1–2 Times
   Match Recovery After Every Match

10. Programme Priority

Highest Priority

Injury Prevention
Recovery
Mobility
Stability
Strength
Power
Performance

Never violate this order.

11. Weekly Training Structure (Adaptive)

The app doesn't follow a fixed Monday–Sunday plan. It adapts based on your recovery and cricket schedule.

Example:

Day Programme
Monday Strength A
Tuesday Mobility
Wednesday Bowling Warm-up + Recovery
Thursday Core Stability
Friday Strength B
Saturday Match Day Warm-up
Sunday Match Recovery

If you report poor recovery, the schedule changes automatically.

12. Workout Generation Flow
    Open App
    ↓
    Recovery Check
    ↓
    Calculate Recovery Score
    ↓
    Check Pain Rules
    ↓
    Check Training Load
    ↓
    Check Cricket Schedule
    ↓
    Choose Programme
    ↓
    Select Exercises
    ↓
    Assign Sets/Reps
    ↓
    Ready to Start
13. Version 1 Programme List
    ID Programme Duration
    WP001 Morning Spine Reset 20 min
    WP002 Evening Recovery 20 min
    WP003 Neck Recovery 15 min
    WP004 Lower Back Recovery 20 min
    WP005 Shoulder Recovery 20 min
    WP006 Core Stability A 25 min
    WP007 Core Stability B 30 min
    WP008 Strength A 35 min
    WP009 Strength B 40 min
    WP010 Full Body Mobility 25 min
    WP011 Bowling Warm-up 15 min
    WP012 Bowling Recovery 20 min
    WP013 Match Day Warm-up 15 min
    WP014 Match Recovery 25 min
    WP015 Sprint Preparation 30 min
14. Workout Engine Rules

The Workout Engine must:

Never choose programmes randomly.
Never ignore pain reports.
Respect training load.
Respect cricket schedule.
Respect available equipment.
Adapt every day.
Keep sessions between 15 and 45 minutes unless explicitly changed by the user.
