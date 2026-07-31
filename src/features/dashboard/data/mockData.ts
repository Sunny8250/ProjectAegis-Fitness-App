import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export const progressStats = [
  { id: "calories", label: "Calories", iconName: "fire", value: "540 kcal" },
  { id: "steps", label: "Steps", iconName: "shoe-print", value: "8,420" },
  { id: "workout", label: "Workout", iconName: "timer-outline", value: "45 min" },
  { id: "hydration", label: "Hydration", iconName: "water-outline", value: "64 oz" },
] as const;

export const workoutCategories = [
  { id: "strength", iconName: "dumbbell", title: "Strength", subtitle: "12 workouts" },
  { id: "cardio", iconName: "run", title: "Cardio", subtitle: "10 workouts" },
  { id: "hiit", iconName: "flash", title: "HIIT", subtitle: "8 workouts" },
  { id: "yoga", iconName: "yoga", title: "Yoga", subtitle: "6 workouts" },
  { id: "mobility", iconName: "run-fast", title: "Mobility", subtitle: "7 workouts" },
  { id: "core", iconName: "target", title: "Core", subtitle: "9 workouts" },
  { id: "recovery", iconName: "leaf", title: "Recovery", subtitle: "4 workouts" },
  { id: "stretching", iconName: "arm-flex", title: "Stretching", subtitle: "5 workouts" },
] as const;

export type WorkoutCategoryId = (typeof workoutCategories)[number]["id"];

export const featuredWorkouts = {
  strength: {
    emoji: "💪",
    title: "Upper Body Strength",
    rating: "4.9",
    difficulty: "Intermediate",
    duration: "45 min",
    exercises: "12 Exercises",
    calories: "320 kcal",
    aiReason: "You missed chest day last week. Let's rebuild that upper body strength.",
    description: "Train your chest, shoulders and triceps using progressive overload.",
  },
  cardio: {
    emoji: "🏃",
    title: "5K Endurance Run",
    rating: "4.8",
    difficulty: "Intermediate",
    duration: "40 min",
    exercises: "10 Exercises",
    calories: "450 kcal",
    aiReason: "Perfect weather for an outdoor endurance session today.",
    description: "Build pace and endurance with a smooth, sustained cardio challenge.",
  },
  hiit: {
    emoji: "⚡",
    title: "Fat Burn Express",
    rating: "4.7",
    difficulty: "Advanced",
    duration: "25 min",
    exercises: "10 Exercises",
    calories: "380 kcal",
    aiReason: "Short on time? Maximize your calorie burn with this quick session.",
    description: "High-intensity bursts and recovery intervals for maximum calorie burn.",
  },
  yoga: {
    emoji: "🧘",
    title: "Morning Yoga Flow",
    rating: "4.9",
    difficulty: "Beginner",
    duration: "30 min",
    exercises: "8 Exercises",
    calories: "120 kcal",
    aiReason: "Start your day with clarity and flexibility.",
    description: "Flow through gentle poses to build flexibility and calm your mind.",
  },
  mobility: {
    emoji: "🤸",
    title: "Full Body Mobility",
    rating: "4.8",
    difficulty: "Beginner",
    duration: "22 min",
    exercises: "9 Exercises",
    calories: "90 kcal",
    aiReason: "Great choice for an active recovery day.",
    description: "Improve joint comfort and movement quality with focused mobility work.",
  },
  core: {
    emoji: "🎯",
    title: "Core Crusher",
    rating: "4.8",
    difficulty: "Intermediate",
    duration: "28 min",
    exercises: "11 Exercises",
    calories: "210 kcal",
    aiReason: "Build the foundation for all your other lifts.",
    description: "Strengthen your core with balanced stability and power movements.",
  },
  recovery: {
    emoji: "🌿",
    title: "Recovery Stretch",
    rating: "4.7",
    difficulty: "Beginner",
    duration: "18 min",
    exercises: "6 Exercises",
    calories: "70 kcal",
    aiReason: "Your muscles are fatigued from yesterday's heavy lifting.",
    description: "Recover stronger with restorative movements and mindful breathing.",
  },
  stretching: {
    emoji: "🦵",
    title: "Evening Stretch",
    rating: "4.8",
    difficulty: "Beginner",
    duration: "20 min",
    exercises: "7 Exercises",
    calories: "80 kcal",
    aiReason: "Wind down and prepare your body for deep sleep.",
    description: "Release tension and improve recovery with guided stretching.",
  },
} as const;

export const aiRecommendation = {
  emoji: "🦾",
  title: "Upper Body Strength",
  rating: "4.9",
  difficulty: "Intermediate",
  duration: "45 min",
  exercises: "12 Exercises",
  calories: "320 kcal",
  description: "Build strength in your chest, shoulders and triceps using progressive overload.",
  imageUri: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
  recommendationReasons: [
    "Your chest hasn't been trained in 5 days",
    "Recovery score is 94%",
    "Readiness score is High",
    "Completing this workout keeps you on track for your weekly goal"
  ],
  expectedBenefits: [
    { icon: "fire", text: "Burn approximately 320 kcal" },
    { icon: "arm-flex", text: "Improve upper body strength" },
    { icon: "calendar-check", text: "Increase weekly consistency" },
    { icon: "target", text: "Stay on track to reach your fitness goal" }
  ],
  targetMuscles: ["Chest", "Shoulders", "Triceps"],
  equipment: ["Dumbbells", "Bench"],
  intensity: "Intermediate"
};

export const healthMetrics = [
  {
    id: "heart-rate",
    iconName: "heart-pulse",
    iconColor: "#EF4444",
    value: "78 bpm",
    label: "Heart Rate",
    support: "Normal range",
    progress: 0.72,
    sparklineData: [60, 65, 80, 75, 78, 85, 78],
    accessibilityLabel: "Heart rate. 78 beats per minute. Normal.",
  },
  {
    id: "sleep",
    iconName: "sleep",
    iconColor: "#8B5CF6",
    value: "7h 45m",
    label: "Sleep",
    support: "Good Recovery",
    progress: 0.96,
    sparklineData: [6.5, 7, 7.5, 6, 8, 7.2, 7.75],
    accessibilityLabel: "Sleep. Seven hours forty five minutes. Good recovery.",
  },
  {
    id: "calories",
    iconName: "fire",
    iconColor: "#F97316",
    value: "540 kcal",
    label: "Calories",
    support: "↗ +8% vs yesterday",
    progress: 0.27,
    sparklineData: [400, 450, 600, 300, 500, 520, 540],
    accessibilityLabel: "Calories. 540 kilocalories. Eight percent increase versus yesterday.",
  },
  {
    id: "hydration",
    iconName: "water-outline",
    iconColor: "#0EA5E9",
    value: "64 oz",
    label: "Hydration",
    support: "On track",
    progress: 0.64,
    sparklineData: [40, 50, 64, 45, 60, 62, 64],
    accessibilityLabel: "Hydration. 64 ounces.",
  },
  {
    id: "weight",
    iconName: "scale-bathroom",
    iconColor: "#10B981",
    value: "172.4 lbs",
    label: "Weight",
    support: "↘ -1.2 lbs this week",
    progress: 0.8,
    sparklineData: [174.5, 174.2, 173.8, 173.5, 173.0, 172.8, 172.4],
    accessibilityLabel: "Weight. 172.4 pounds. Trending down.",
  },
  {
    id: "steps",
    iconName: "shoe-print",
    iconColor: "#2563EB",
    value: "8,420",
    label: "Steps",
    support: "Goal: 10,000",
    progress: 0.84,
    sparklineData: [5000, 7200, 8000, 6000, 9500, 8100, 8420],
    accessibilityLabel: "Steps. 8,420 steps. Goal 10,000.",
  },
] as const;

export const quickActions = [
  {
    id: "workout",
    iconName: "dumbbell",
    colorKey: "primary",
    title: "Workout",
    subtitle: "Start Training",
    accessibilityLabel: "Start workout",
  },
  {
    id: "nutrition",
    iconName: "food-apple",
    colorKey: "warning",
    title: "Nutrition",
    subtitle: "Track Meals",
    accessibilityLabel: "Track meals",
  },
  {
    id: "water",
    iconName: "water-outline",
    colorKey: "info",
    title: "Hydration",
    subtitle: "Log Water",
    accessibilityLabel: "Log water",
  },
  {
    id: "ai-coach",
    iconName: "robot-outline",
    colorKey: "success",
    title: "AI Coach",
    subtitle: "Get Advice",
    accessibilityLabel: "AI Coach",
  },
  {
    id: "progress",
    iconName: "chart-line",
    colorKey: "primary",
    title: "Progress",
    subtitle: "View Stats",
    accessibilityLabel: "View Stats",
  },
] as const satisfies readonly {
  id: string;
  iconName: IconName;
  colorKey: "primary" | "info" | "warning" | "success" | "error";
  title: string;
  subtitle: string;
  accessibilityLabel: string;
}[];

export const achievements = [
  {
    id: "streak",
    icon: "fire",
    color: "#F97316",
    title: "5 Day Streak",
    subtitle: "Unstoppable!",
  },
  {
    id: "badge-1",
    icon: "medal-outline",
    color: "#EAB308",
    title: "Early Bird",
    subtitle: "5 AM Workout",
  },
  {
    id: "milestone",
    icon: "trophy-outline",
    color: "#8B5CF6",
    title: "10k Club",
    subtitle: "Steps Goal Hit",
  },
] as const;
