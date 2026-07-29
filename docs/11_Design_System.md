Project Aegis – Design System

Version: 1.0

1. Purpose

The Design System defines the visual language and interaction standards for Project Aegis.

Its goals are to:

Maintain visual consistency across every screen.
Improve usability and accessibility.
Reduce design decisions during development.
Ensure every component feels like part of the same application.
Provide clear guidance for AI coding assistants.

The app should feel calm, professional, trustworthy, and focused, similar to a premium health and sports coaching application.

2. Design Principles
   Clarity First: Information should always be easy to read.
   Minimalism: Avoid unnecessary visual clutter.
   Consistency: Similar actions should always look and behave the same.
   Accessibility: High contrast, readable text, and touch-friendly controls.
   Performance: Smooth animations without sacrificing responsiveness.
   Guidance: The app should coach the user rather than overwhelm them.
3. Colour Palette
   Primary
   Primary Blue: #2563EB
   Primary Blue (Dark): #1D4ED8
   Secondary
   Emerald: #10B981
   Amber: #F59E0B
   Red: #EF4444
   Neutral (Light)
   Background: #F8FAFC
   Surface: #FFFFFF
   Border: #E5E7EB
   Text Primary: #111827
   Text Secondary: #6B7280
   Neutral (Dark)
   Background: #0F172A
   Surface: #1E293B
   Border: #334155
   Text Primary: #F8FAFC
   Text Secondary: #CBD5E1
4. Semantic Colours
   Purpose Colour
   Success Emerald
   Warning Amber
   Error Red
   Information Primary Blue
   Disabled Grey
5. Typography
   Font Family
   Inter (preferred)
   System font (fallback)
   Text Styles
   Style Size Weight
   Display 32 Bold
   Heading 1 28 Bold
   Heading 2 24 SemiBold
   Heading 3 20 SemiBold
   Title 18 Medium
   Body 16 Regular
   Caption 14 Regular
   Small 12 Regular

Line height should be approximately 1.4× the font size.

6. Spacing System

Use an 8-point grid.

Available spacing values:

4
8
12
16
24
32
40
48
64

Rules:

Screen padding: 16
Card padding: 16
Section spacing: 24
Large section spacing: 32

7. Border Radius
   Component Radius
   Buttons 12
   Cards 16
   Inputs 12
   Bottom Sheets 24
   Pills 999

8. Elevation & Shadows

Use subtle shadows only where necessary.

Cards:

Small elevation
Soft shadow
Avoid heavy drop shadows

Dark mode should reduce shadow intensity.

9. Icons

Preferred icon library:

Expo Vector Icons (Lucide or Material Community Icons)

Guidelines:

Outline icons for navigation.
Filled icons for active states.
Standard size: 24 px.
Large icons: 32 px.

10. Buttons
    Primary Button
    Filled with Primary Blue.
    White text.
    Height: 48 px.
    Full-width by default.
    Secondary Button
    White/Dark surface.
    Border with Primary Blue.
    Blue text.
    Destructive Button
    Red background.
    White text.

11. Cards

Every card should include:

Rounded corners
Padding: 16
Subtle elevation
Clear title
Optional icon
Consistent spacing

Card types:

Recovery Card
Workout Card
Progress Card
Achievement Card
Statistic Card

12. Input Fields

Inputs should have:

Rounded corners
Clear labels
Helper text when needed
Error state with red border and message
Disabled state with reduced opacity

13. Navigation

Bottom Navigation:

Home
Progress
History
Library
Settings

Active item:

Primary Blue
Slight scale animation

Inactive item:

Grey

14. Charts

Charts should use:

Primary Blue for primary data
Emerald for improvements
Amber for warnings
Red for regressions

Avoid more than five colours on a single chart.

15. Progress Indicators

Examples:

Recovery Score
Workout Completion
Weekly Goal
Streak Progress

Preferred styles:

Circular progress
Linear progress
Ring charts

16. Animations

Use animations sparingly.

Recommended durations:

Animation Duration
Fade 200 ms
Slide 250 ms
Card Expand 300 ms
Success Celebration 500 ms

Rules:

Never block interaction.
Respect reduced motion settings if supported.

17. Haptic Feedback

Trigger haptics for:

Workout start
Exercise completion
Workout completion
Achievement unlocked
Error feedback

Do not trigger haptics on every tap.

18. Empty States

Every screen should have an empty state.

Examples:

History:

"No workouts completed yet. Your journey starts today."

Achievements:

"Keep training to unlock your first achievement."

19. Loading States

Use skeleton loaders instead of blank screens.

Loading indicators should appear for:

Dashboard
Workout generation
History
Analytics

Avoid full-screen spinners unless absolutely necessary.

20. Error States

Every error should:

Explain what happened.
Suggest the next action.
Avoid technical jargon.

Example:

"Unable to load today's workout. Please try again."

21. Accessibility
    Minimum touch target: 44 × 44 px
    Sufficient colour contrast
    Support dynamic text sizing where practical
    Avoid conveying information by colour alone
22. Theme Behaviour

Support:

Light Theme
Dark Theme
System Theme (optional)

All components must adapt automatically.

23. Coach Personality

The app's tone should be:

Encouraging
Calm
Professional
Honest
Supportive

Examples:

"Great work today!"
"Your recovery score suggests a lighter session."
"Consistency beats intensity."

Avoid guilt-inducing messages.

24. Component Naming

Reusable UI components should follow a consistent naming convention:

PrimaryButton
RecoveryCard
WorkoutCard
ExerciseCard
ProgressRing
CoachMessage
StatisticTile
SectionHeader
EmptyState
LoadingSkeleton 25. Future Expansion

The design system should accommodate:

Tablet layouts
Wearable integration
Voice coaching
AI chat interface
Cloud synchronisation
Additional sports beyond cricket
