export const QUICK_FILTERS = [
  "All",
  "Strength",
  "Cardio",
  "HIIT",
  "Mobility",
  "Yoga",
  "Recovery",
  "Stretching",
  "Home",
  "Gym",
  "Beginner",
  "Intermediate",
  "Advanced",
  "15 min",
  "30 min",
  "45 min",
  "60+ min"
];

export const ACTIVE_WORKOUT = {
  title: "Core Crusher Day 1",
  progress: 0.65, // 65%
  remainingExercises: 3,
  remainingTime: "8 min",
};

export const FEATURED_WORKOUT = {
  title: "Full Body Kettlebell",
  imageUri: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
  difficulty: "Advanced",
  duration: "45 min",
  calories: "450 kcal",
  exercises: "14 Exercises",
  rating: "4.9",
  isAIRecommended: true,
};

export const RECOMMENDED_CATEGORIES = [
  {
    id: "strength",
    title: "Strength",
    description: "Build muscle and power",
    count: 24,
    imageUri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "cardio",
    title: "Cardio",
    description: "Boost endurance",
    count: 18,
    imageUri: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "mobility",
    title: "Mobility",
    description: "Move better, feel better",
    count: 12,
    imageUri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  }
];

export const TRENDING_WORKOUTS = [
  {
    id: "t1",
    title: "HIIT Burnout",
    duration: "25 min",
    difficulty: "Advanced",
    rating: "4.8",
    imageUri: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t2",
    title: "Dumbbell Shoulders",
    duration: "30 min",
    difficulty: "Intermediate",
    rating: "4.9",
    imageUri: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t3",
    title: "Morning Flow",
    duration: "15 min",
    difficulty: "Beginner",
    rating: "4.7",
    imageUri: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
  }
];

export const WORKOUT_PROGRAMS = [
  {
    id: "p1",
    title: "30-Day Fat Loss",
    daysCompleted: 12,
    totalDays: 30,
    progress: 0.4,
    imageUri: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Beginner Strength",
    daysCompleted: 0,
    totalDays: 14,
    progress: 0,
    imageUri: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Mobility Challenge",
    daysCompleted: 5,
    totalDays: 7,
    progress: 0.71,
    imageUri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  }
];

export const RECENT_WORKOUTS = [
  {
    id: "r1",
    title: "Leg Day Primer",
    duration: "40 min",
    difficulty: "Intermediate",
    rating: "4.9",
    imageUri: "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "r2",
    title: "Post-Run Stretch",
    duration: "10 min",
    difficulty: "Beginner",
    rating: "4.8",
    imageUri: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
  }
];
