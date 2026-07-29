import type { OnboardingItem } from '../types';

/** Data-driven onboarding content rendered by the pager. */
export const onboardingData: OnboardingItem[] = [
  {
    id: 'welcome',
    emoji: '🛡️',
    title: 'Welcome to AEGIS',
    description:
      'Your personal fitness companion designed to help you build stronger habits and achieve lasting results.',
  },
  {
    id: 'tracking',
    emoji: '📈',
    title: 'Track Every Workout',
    description: 'Log your workouts, monitor your progress, and celebrate every milestone.',
  },
  {
    id: 'habits',
    emoji: '🔥',
    title: 'Build Better Habits',
    description:
      'Stay consistent with daily routines and turn small actions into lifelong healthy habits.',
  },
  {
    id: 'begin',
    emoji: '🚀',
    title: 'Ready to Begin?',
    description:
      "Let's personalize your fitness journey and start building a healthier future today.",
  },
];
