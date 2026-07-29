Project Aegis – Workout Engine Logic

Version: 1.0

1. Purpose

The Workout Engine generates a personalised workout every day based on the athlete's recovery, training history, cricket workload, available equipment, and long-term progression.

The engine does not select random exercises. Every recommendation follows structured coaching rules.

Primary objectives:

Improve performance
Reduce injury risk
Maintain long-term consistency
Adapt to daily readiness

2. Engine Inputs

The Workout Engine receives data from multiple sources.

Athlete Profile
│
Recovery Score
│
Readiness Score
│
Training Load
│
Pain Assessment
│
Workout History
│
Movement Intelligence Database
│
Workout Programme Database
│
Equipment Availability
│
Cricket Schedule

3. Workout Generation Pipeline
   Start
   ↓
   Validate Recovery Data
   ↓
   Apply Safety Rules
   ↓
   Select Workout Programme
   ↓
   Select Warm-up
   ↓
   Generate Main Workout
   ↓
   Generate Cooldown
   ↓
   Assign Sets & Reps
   ↓
   Validate Workout
   ↓
   Save Session

4. Safety Validation

Before generating a workout, verify:

Recovery check completed
No severe pain
Equipment available
Previous workout completed or intentionally skipped
Database integrity

If any critical safety rule fails:

Return a recovery-only session.

5. Workout Categories

Possible outputs:

Morning Spine Reset
Recovery Session
Mobility Session
Core Stability
Strength A
Strength B
Lower Body Strength
Upper Body Strength
Bowling Warm-up
Bowling Recovery
Match Warm-up
Match Recovery
Sprint Preparation

Only one primary programme is selected each day.

6. Programme Selection Logic

Priority order:

Safety
↓
Recovery Score
↓
Pain Rules
↓
Training Load
↓
Cricket Schedule
↓
Progression Stage
↓
Workout Programme

Safety always overrides progression.

7. Warm-up Builder

Every workout starts with a warm-up.

Duration:

5–10 minutes.

Components:

Light mobility
Joint preparation
Muscle activation
Movement rehearsal

Example:

Neck Mobility
↓

Thoracic Rotation
↓

Hip Mobility
↓

Glute Activation
↓

Core Activation
↓

Sport Specific Drill

8. Main Workout Builder

Exercises are selected from the Movement Intelligence Database.

Selection rules:

Match workout goal
Respect pain restrictions
Avoid duplicate movement patterns
Include balanced muscle groups
Progress appropriately

9. Cooldown Builder

Every session ends with recovery work.

Includes:

Gentle stretching
Breathing
Relaxation
Mobility

Duration:

5–10 minutes.

10. Exercise Ordering

Recommended order:

Warm-up
↓
Mobility
↓
Activation
↓
Primary Strength
↓
Secondary Strength
↓
Accessory Work
↓
Core
↓
Cooldown

Never begin with high-intensity exercises.

11. Exercise Selection Rules

Each exercise must satisfy:

Safe for current pain levels
Correct difficulty
Equipment available
Fits workout objective
Not excessively repeated in recent sessions

Preference is given to movement variety while maintaining consistency.

12. Sets & Repetitions

General starting guidelines:

Workout Type Sets Reps
Mobility 1–2 Time-based
Recovery 1–2 Time-based
Stability 2–3 8–12
Strength 3–4 6–12
Conditioning Variable Time-based

The Progression Engine may adjust these values.

13. Rest Periods
    Exercise Type Rest
    Mobility 15–30 sec
    Stability 30–45 sec
    Strength 60–120 sec
    Conditioning 30–60 sec

Rest may be shortened or lengthened depending on recovery status.

14. Progression Rules

Progress only when:

Recovery Score ≥ 80
Pain ≤ 2/10
Previous session completed
Technique rated satisfactory
No increase in soreness

Possible progressions:

Increase repetitions
Increase hold time
Add a set
Advance to a harder exercise
Reduce assistance

Only one progression should occur at a time.

15. Regression Rules

Automatically regress when:

Pain increases during exercise
Recovery Score < 60
Technique repeatedly breaks down
Exercise cannot be completed safely

Regression options:

Easier variation
Fewer repetitions
Reduced hold time
Longer rest
Replace exercise

16. Cricket-Specific Logic
    Bowling Day

Prioritise:

Shoulder preparation
Thoracic mobility
Hip mobility
Core activation
Calf preparation

Avoid unnecessary fatigue before bowling.

Batting Day

Focus on:

Trunk rotation
Hip mobility
Balance
Shoulder mobility
Wrist preparation
Match Recovery

Prioritise:

Walking
Mobility
Stretching
Breathing
Light recovery work

Avoid heavy strength training.

17. Injury Substitution Rules

If an exercise is unsuitable:

Example:

Push-up
↓
Incline Push-up
↓
Wall Push-up

Another example:

Single-leg Bird Dog
↓
Bird Dog
↓
Dead Bug

The substitute should train a similar movement pattern whenever possible.

18. Weekly Variety Rules

Avoid repeating the exact same workout on consecutive days.

Aim for balance across the week:

Mobility
Stability
Strength
Recovery
Cricket-specific preparation

Consistency is preferred over constant novelty.

19. Workout Validation

Before presenting today's workout, confirm:

All exercises exist.
No duplicate exercises.
Programme duration is appropriate.
Total workload matches readiness.
Warm-up and cooldown are included.

If validation fails, regenerate the affected section rather than the entire workout.

20. Session Completion

When the workout finishes:

Store:

Duration
Exercises completed
Sets completed
Pain before/after
User notes
Perceived difficulty

Update:

Training Load
Workout History
Progress Records
Achievement Progress

21. Coach Feedback

Provide a summary after every workout.

Examples:

Excellent

"You completed every exercise with good consistency. Keep building on today's effort."

Moderate

"Nice work. Recovery tomorrow will help you continue progressing."

Incomplete

"You completed part of the session. That's still progress—let's build from here."

22. Edge Cases
    Workout Interrupted

Save:

Current exercise
Set
Rep
Timer

Resume automatically when the user returns.

Exercise Skipped

Replace only if essential.

Otherwise continue the workout and note the skipped exercise in the session summary.

Pain During Workout

Immediately:

Pause progression
Offer regression or replacement
Update pain record
Recalculate the remaining session if needed

23. Future Enhancements

Version 2 may include:

AI-generated exercise sequencing
Video-based technique feedback
Wearable-guided rest periods
Adaptive tempo recommendations
Voice-guided coaching

24. Workout Engine Principles

The engine must:

Prioritise safety over intensity.
Personalise every session.
Build progressive long-term improvement.
Keep recommendations explainable.
Never rely on randomness.
