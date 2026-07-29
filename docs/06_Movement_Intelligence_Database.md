Project Aegis – Movement Intelligence Database (MID)

Version: 1.0

1. Purpose

The Movement Intelligence Database (MID) is the knowledge base for every exercise in Project Aegis.

The Workout Engine, Recovery Engine, and Progression Engine must never hardcode exercises.

Instead, they query the MID.

Example:

Recovery Goal
↓

Need Core Stability
↓

Need Low Back Friendly
↓

No Equipment
↓

Beginner Level
↓

Return Matching Exercises

2. Database Structure

Each exercise contains:

Exercise ID
Name
Category
Subcategory
Difficulty
Primary Goal
Secondary Goals
Target Muscles
Supporting Muscles
Movement Pattern
Equipment
Video Path
Thumbnail
Description
Benefits
Coaching Cues
Common Mistakes
Contraindications
Progressions
Regressions
Cricket Tags
Medical Tags
Estimated Time
Calories (Optional)

3. Exercise Categories
   Mobility
   Neck
   Thoracic Spine
   Lumbar Spine
   Shoulders
   Hips
   Ankles
   Calves
   Stability
   Core
   Shoulder Stability
   Hip Stability
   Knee Stability
   Balance
   Strength
   Upper Body
   Lower Body
   Core
   Posterior Chain
   Grip
   Cricket
   Bowling Warm-up
   Batting Warm-up
   Match Recovery
   Bowling Recovery
   Sprint Preparation
   Throwing Preparation
   Recovery
   Stretching
   Breathing
   Foam Rolling
   Mobility Flow

4. Exercise Metadata

Every exercise must include searchable tags.

Example:

Bird Dog
Tags:

- Core Stability
- Lumbar Stability
- Anti Rotation
- Beginner
- Recovery
- Bowling Foundation
- Spine Friendly
- No Equipment

This allows intelligent searching instead of fixed workout lists.

5. Difficulty Levels
   Level 1 – Beginner
   Level 2 – Easy
   Level 3 – Intermediate
   Level 4 – Advanced
   Level 5 – Elite

The Progression Engine uses these levels.

6. Equipment Tags
   None
   Yoga Mat
   Resistance Band
   Dumbbells
   Kettlebell
   Foam Roller
   Chair
   Bench
7. Medical Tags

Examples:

Cervical Friendly
Lumbar Friendly
Shoulder Friendly
Knee Friendly
Hip Friendly
Calf Recovery
Hamstring Recovery
Post Bowling
Post Match

These help the Recovery Engine filter unsuitable exercises.

8. Cricket Tags

Examples:

Fast Bowling
Batting
Throwing
Sprinting
Power
Rotation
Core Endurance
Shoulder Stability
Hip Rotation
Recovery

9. Progression Rules

Each exercise includes:

Regression
↓

Base Exercise
↓

Progression 1
↓

Progression 2
↓

Advanced

Example:

Dead Bug

↓

Bird Dog

↓

Side Plank

↓

Single Leg Bird Dog

↓

Stability Ball Bird Dog

10. Contraindications

Every exercise must define when it should NOT be used.

Example:

Push-up

Avoid if:

Severe wrist pain
Acute shoulder injury
Pain > 7/10
Squat

Avoid if:

Acute knee injury
Severe lumbar pain

11. Exercise Template

Every exercise follows this format.

ID:

EX001

Name:

Bird Dog

Category:

Core Stability

Difficulty:

Beginner

Equipment:

None

Duration:

45 sec

Primary Goal:

Lumbar Stability

Secondary Goals:

Core Endurance

Balance

Target Muscles:

Core

Glutes

Lower Back

Tags:

Recovery

Bowling

Spine Friendly

No Equipment

Contraindications:

Acute wrist injury

Coaching Cues:

Neutral spine

Move slowly

Keep hips level

Common Mistakes:

Arching lower back

Rushing movement

Holding breath

Progression:

Single Leg Bird Dog

Regression:

Dead Bug

12. Workout Selection Logic

The Workout Engine searches the MID like this:

Recovery Goal
↓

Filter by Pain Rules

↓

Filter by Equipment

↓

Filter by Difficulty

↓

Filter by Cricket Phase

↓

Remove Contraindicated Exercises

↓

Build Workout

↓

Assign Sets/Reps

13. Initial Exercise Library (Version 1)
    Neck Mobility
    Chin Tuck
    Neck Rotation
    Neck Side Bend
    Cervical Retraction
    Thoracic Mobility
    Cat-Cow
    Thread the Needle
    Open Book
    Thoracic Extension
    Shoulder Mobility
    Arm Circles
    Band Pull Apart
    Wall Slides
    Shoulder CARs
    Core Stability
    Dead Bug
    Bird Dog
    Side Plank
    Front Plank
    Pallof Press
    Hip Mobility
    World's Greatest Stretch
    Hip Flexor Stretch
    90/90 Hip Switch
    Glute Bridge
    Lower Body Strength
    Bodyweight Squat
    Split Squat
    Reverse Lunge
    Romanian Deadlift
    Calf Raise
    Upper Body Strength
    Push-up
    Incline Push-up
    Resistance Band Row
    Dumbbell Row
    Overhead Press
    Cricket Warm-up
    Bowling Arm Circles
    Wrist Mobility
    High Knees
    Butt Kicks
    A-Skips
    Leg Swings
    Recovery
    Child's Pose
    Cobra Stretch
    Hamstring Stretch
    Calf Stretch
    Foam Roll Calves
    Box Breathing

Version 1 target: 60–70 high-quality exercises.

14. Engine Rules

The Movement Intelligence Database must always:

Return only safe exercises.
Respect pain levels.
Respect equipment availability.
Respect progression level.
Support offline search.
Be extensible without changing app code.
