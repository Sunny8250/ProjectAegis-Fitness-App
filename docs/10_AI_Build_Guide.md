Project Aegis – AI Build Guide

Version: 1.0

1. Purpose

This document defines how AI coding assistants (Claude, Codex, ChatGPT, Cursor, etc.) must build Project Aegis.

Every AI session must follow this guide to maintain a consistent architecture and avoid regressions.

2. AI Role

When generating code, the AI should behave as:

Senior React Native Architect
Senior TypeScript Engineer
Mobile Performance Engineer
SQLite Database Engineer
UX-focused Developer

The AI should prioritise:

Correctness
Maintainability
Performance
Readability

3. Project Overview

Project Aegis is:

Offline-first
Single-user
React Native (Expo)
SQLite
Zustand
TypeScript

The application is a:

Digital Physiotherapist
Strength & Conditioning Coach
Cricket Performance Coach

It is not:

Social app
Marketplace
Workout catalogue

4. Documents to Read Before Coding

Before implementing any feature, the AI must read:

PRD
App Constitution
System Architecture
Functional Specification
Technical Architecture

Feature-specific work should also reference:

Movement Intelligence Database
Workout Programme Database
Database Schema

5. General Rules

The AI must:

Follow the existing architecture.
Reuse components whenever possible.
Avoid duplicate code.
Write modular code.
Keep business logic outside UI.
Use strict TypeScript.
Avoid unnecessary libraries.

Never refactor unrelated code unless specifically requested.

6. Development Workflow

Every feature should follow this order:

Understand Requirements
↓
Review Documentation
↓
Plan Changes
↓
Implement Feature
↓
Test
↓
Review
↓
Commit

Never skip planning.

7. Feature Implementation Template

Each feature should include:

Objective

What is being built?

Files to Create

List every new file.

Files to Modify

List every existing file.

Database Changes

If applicable.

State Changes

If applicable.

Testing

Manual + automated.

8. Prompt Template

Every prompt should follow this structure:

Role:
You are a senior React Native engineer.

Project:
Project Aegis.

Context:
Read the relevant project documentation before coding.

Task:
Implement ONLY the requested feature.

Requirements:

- Use TypeScript
- Use Expo Router
- Use Zustand
- Use SQLite
- Follow existing architecture
- Don't modify unrelated files
- Don't add unnecessary dependencies
- Ensure offline compatibility

Deliverables:

- Production-ready code
- File list
- Brief explanation

9. Coding Standards

The AI must:

Use functional components.
Use hooks.
Prefer composition over inheritance.
Use meaningful variable names.
Keep functions under ~50 lines where practical.
Avoid deeply nested logic.

10. File Creation Rules

Before creating a new file:

Ask:

Does a similar file already exist?
Can this be reused?
Does this belong in an existing folder?

Avoid duplicate components.

11. Database Rules

Database access is only allowed through repositories.

Never query SQLite directly from:

Screens
Components
Hooks

Repositories handle:

CRUD
Transactions
Migrations

12. State Rules

Global state belongs only in Zustand stores.

Local component state should only contain UI-specific information.

Business state belongs inside stores.

13. UI Rules

Every screen must:

Support dark mode.
Be responsive.
Work offline.
Handle empty states.
Handle loading states.
Handle error states.

14. Performance Rules

The AI should avoid:

Unnecessary re-renders.
Large inline objects.
Expensive calculations during rendering.
Blocking the UI thread.

Use memoisation only when it provides measurable benefit.

15. Testing Checklist

Before considering a feature complete:

No TypeScript errors.
No ESLint errors.
App builds successfully.
Offline functionality works.
Dark mode verified.
Error handling verified.
Existing functionality unaffected.

16. Code Review Checklist

Every implementation should answer:

Does it follow the architecture?
Is it reusable?
Is it readable?
Is it strongly typed?
Is it tested?
Is it documented if necessary?

17. Git Workflow

Recommended branch strategy:

main

↓

develop

↓

feature/dashboard

↓

feature/recovery-engine

↓

feature/workout-player

Each feature should be developed independently and merged only after testing.

18. AI Session Rules

Every new AI chat should start with:

Read the following documents before coding:

1. PRD
2. App Constitution
3. Technical Architecture

Do not change the architecture.

Implement only the requested feature.

Do not modify unrelated files.

Return production-ready code.

This keeps responses focused and consistent.

19. Milestone Plan
    Milestone 1
    Project setup
    Navigation
    Theme
    SQLite
    Zustand
    Milestone 2
    Dashboard
    Athlete Profile
    Milestone 3
    Recovery Check
    Recovery Engine
    Milestone 4
    Workout Engine
    Exercise Player
    Milestone 5
    Progress
    History
    Analytics
    Milestone 6
    Notifications
    Polish
    Testing
20. Definition of Success

Project Aegis Version 1 is complete when:

All planned screens are implemented.
Recovery Intelligence recommends workouts correctly.
Workout Engine generates personalised sessions.
Exercise Player guides the entire workout.
Progress is tracked accurately.
The app works fully offline.
No critical bugs remain.
