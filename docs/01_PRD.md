Project Aegis
Product Requirements Document (PRD)

Version: 1.0

Project Name: Project Aegis (working title)

1. Executive Summary

Project Aegis is a personal offline-first React Native application designed to function as a digital physiotherapist, strength & conditioning coach, and cricket performance coach.

Unlike traditional fitness applications that require users to choose workouts manually, Project Aegis analyses the athlete's daily recovery, pain levels, cricket workload, and training history to automatically generate the most appropriate session.

The goal is to improve long-term health, reduce pain, prevent injuries, and increase cricket performance while requiring minimal user interaction.

2. Vision

Create the most intelligent personal rehabilitation and cricket training companion that:

Thinks before recommending.
Adapts every day.
Learns from previous workouts.
Prioritises recovery over intensity.
Helps the athlete return stronger without unnecessary risk.

3. Problem Statement

Current fitness apps suffer from several limitations:

Users must decide what workout to perform.
Exercises are generic.
Recovery is rarely considered.
Cricket-specific workload is ignored.
There is little long-term adaptation.
Pain history is not incorporated into recommendations.

Project Aegis addresses these shortcomings by making personalised, recovery-driven decisions.

4. Target User

Primary User: One athlete (the owner of the app)

Profile
Cricket player
Wants to improve mobility, strength, and performance
Requires rehabilitation support
Needs structured progression
Prefers guided sessions over planning workouts manually

This application is not intended for public release in Version 1.

5. Goals
   Primary Goals
   Reduce pain and stiffness.
   Improve mobility.
   Improve core stability.
   Increase strength progressively.
   Improve cricket performance.
   Prevent overtraining.
   Build long-term consistency.
   Secondary Goals
   Maintain workout history.
   Track recovery.
   Visualise progress.
   Build sustainable habits.
6. Success Criteria

The application should enable the user to:

Complete daily recovery checks in under 30 seconds.
Start a workout with a single tap.
Receive personalised sessions every day.
Complete workouts with minimal interaction.
Track recovery and performance over time.

7. Product Philosophy

The application should behave like:

A physiotherapist.
A cricket coach.
A strength & conditioning coach.

It should not feel like:

A workout catalogue.
A generic gym app.
A fitness marketplace.
A social media platform.

8. Core Principles
   Recovery before performance.
   Pain should guide programming.
   Consistency is more important than intensity.
   Simplicity over unnecessary complexity.
   Offline-first architecture.
   Data-driven recommendations.
   Minimal user input.
   Safe progression.

9. Key Features
   Athlete Profile

Stores:

Personal information
Cricket profile
Equipment
Baseline assessments
Injury history
Recovery Intelligence

Collects:

Neck pain
Back pain
Calf tightness
Sleep quality
Energy level
Cricket workload

Produces:

Recovery Score
Readiness Score
Workout Recommendation
Workout Engine

Automatically generates:

Recovery sessions
Mobility sessions
Strength sessions
Cricket preparation
Cricket recovery
Exercise Player

Provides:

Exercise videos
Countdown
Rep counter
Hold timer
Rest timer
Coaching tips
Progress Tracking

Tracks:

Pain trends
Mobility improvements
Strength progression
Recovery trends
Workout consistency
Training Load Engine

Monitors:

Bowling workload
Strength workload
Weekly training load
Recovery trends

Adjusts future recommendations to reduce injury risk.

10. Functional Requirements

The app must:

Work completely offline.
Store all data locally.
Automatically recommend workouts.
Resume interrupted workouts.
Save every completed session.
Adapt future workouts using historical data.

11. Non-Functional Requirements
    Offline-first
    Fast startup (<2 seconds)
    Smooth animations (60 FPS where possible)
    Responsive UI
    Low battery usage
    Secure local storage
    Reliable data persistence

12. Technology Stack
    Frontend
    React Native
    Expo
    TypeScript
    State Management
    Zustand
    Database
    SQLite
    Navigation
    Expo Router
    Animation
    React Native Reanimated
    Storage
    Expo FileSystem
    AsyncStorage (preferences)

13. Out of Scope (Version 1)

The following features are intentionally excluded:

User accounts
Cloud sync
Payments
Social sharing
Community features
Wearable integration
AI chat coach
Multi-user support

14. Risks
    Incorrect recovery recommendations.
    Poor quality exercise videos.
    Excessive complexity.
    Incomplete exercise database.

Mitigation:

Conservative progression.
Extensive testing.
Manual review of coaching rules.

15. Future Roadmap
    Version 1
    Offline personal coaching
    Recovery intelligence
    Workout engine
    Progress tracking
    Version 2
    AI Coach
    Voice-guided workouts
    Smart wearable integration
    Cloud backup
    Advanced analytics
