Project Aegis – Master Project Index

Version: 1.0

1. Purpose

The Project Master Index provides a complete overview of the Project Aegis documentation.

It serves as:

The primary entry point for the project.
A navigation guide for all documentation.
A reference for developers and AI assistants.
A roadmap from planning through implementation and future evolution.

2. Project Vision

Project Aegis is an offline-first React Native application that acts as a personal:

Physiotherapist
Strength & Conditioning Coach
Cricket Performance Coach

Its mission is to help the athlete:

Train consistently
Recover intelligently
Improve safely
Build long-term athletic performance

3. Core Principles

Project Aegis is built on these principles:

Offline First
Privacy by Design
Single User Focus
Evidence-Informed Coaching
Simplicity Over Complexity
Modular Architecture
Safety Before Performance
Long-Term Progress

4. Technology Stack
   Mobile
   React Native
   Expo
   TypeScript
   Navigation
   Expo Router
   State Management
   Zustand
   Local Database
   SQLite
   Animations
   React Native Reanimated
   Notifications
   Expo Notifications
   Charts
   React Native SVG / Victory Native (or chosen chart library)

5. Documentation Reading Order
   Foundation
   PRD
   App Constitution
   System Architecture
   Functional Specification
   Interaction Behaviour
   Data
   Movement Intelligence Database
   Workout Programme Database
   Database Schema
   Development
   Technical Architecture
   AI Build Guide
   Design System
   Component Library
   Business Logic
   Recovery Engine Logic
   Workout Engine Logic
   Quality
   Test Plan
   Database Migrations
   API Abstraction
   User Experience
   Notification Strategy
   Analytics Engine
   Exercise Content Guide
   Achievement System
   Copywriting Guide
   Operations
   Release Checklist
   Future Roadmap
   Reference
   Project Master Index

6. Documentation Summary
   No. Document Purpose
   01 PRD Product vision and requirements
   02 App Constitution Permanent project rules
   03 System Architecture High-level architecture
   04 Functional Specification Screen and feature behaviour
   05 Interaction Behaviour UX flows and interactions
   06 Movement Intelligence Database Exercise knowledge base
   07 Workout Programme Database Programme definitions
   08 Database Schema SQLite structure
   09 Technical Architecture Code architecture
   10 AI Build Guide AI-assisted development rules
   11 Design System UI standards
   12 Component Library Reusable UI components
   13 Recovery Engine Logic Recovery calculations
   14 Workout Engine Logic Workout generation
   15 Test Plan QA strategy
   16 Database Migrations Schema evolution
   17 API Abstraction Data access architecture
   18 Notification Strategy Reminder system
   19 Analytics Engine Insights and reporting
   20 Exercise Content Guide Exercise authoring standard
   21 Achievement System Gamification philosophy
   22 Copywriting Guide Tone and messaging
   23 Release Checklist Release readiness
   24 Future Roadmap Long-term vision
   25 Project Master Index Documentation navigation

7. Development Phases
   Phase 1 – Foundation
   Project setup
   Navigation
   Theme
   SQLite
   Zustand
   Folder structure
   Phase 2 – Core Features
   Recovery Check
   Workout Engine
   Exercise Player
   History
   Analytics
   Phase 3 – Polish
   Animations
   Notifications
   Achievements
   Accessibility
   Performance optimisation
   Phase 4 – Release
   Testing
   Bug fixes
   Documentation review
   Production build

8. Architecture Overview
   User
   │
   ▼
   Presentation Layer
   │
   ▼
   Business Engines
   │
   ▼
   Services
   │
   ▼
   Repositories
   │
   ▼
   SQLite Database

Future integrations (cloud, AI, wearables) connect through the repository layer without changing the business engines.

9. Quality Standards

Every feature should:

Follow the Design System.
Respect the App Constitution.
Be covered by tests where practical.
Maintain offline functionality.
Preserve user privacy.
Meet performance targets.

10. Success Criteria

Version 1 is successful when it:

Generates safe, personalised workouts.
Adapts to daily recovery.
Stores all data locally.
Provides meaningful analytics.
Delivers a smooth and reliable user experience.

11. Future Expansion

The architecture is prepared for:

Optional cloud backup
AI coaching
Health Connect
Apple Health
Wearable integration
Multi-device synchronisation
Advanced analytics
Cross-platform ecosystem

These features should not compromise the offline-first experience.

12. Definition of Done

Project Aegis Version 1 is considered complete when:

All planned features are implemented.
Critical and high-priority bugs are resolved.
Documentation is up to date.
Accessibility and performance targets are met.
Release checklist is fully completed.
The app is stable for daily personal use.

13. Maintenance Guidelines

Future updates should:

Maintain backward compatibility where possible.
Include database migrations when required.
Update documentation alongside code changes.
Preserve existing user data.
Follow semantic versioning.

14. Closing Statement

Project Aegis is more than a workout tracker. It is a long-term coaching system built around safe rehabilitation, intelligent recovery, progressive strength, and cricket performance.

Every design decision, feature, and future enhancement should support that mission.
