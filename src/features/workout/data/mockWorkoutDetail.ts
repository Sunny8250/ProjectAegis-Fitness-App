import type { ExerciseCategory } from "../utils/restPlanner";

/**
 * Shape of a single exercise in the workout detail payload.
 *
 * `category`, `targetMuscles`, `prepCues`, and `restSeconds` feed the rest and
 * recovery experience; every one of them is optional at the type level only
 * where a sensible fallback exists in {@link resolveRestPlan}.
 */
export interface WorkoutDetailExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  duration: string;
  equipment: string[];
  difficulty: string;
  /** Movement classification driving the prescribed rest window. */
  category: ExerciseCategory;
  imageUri: string;
  instructions: string[];
  mistakes: string[];
  /** Muscles this specific movement loads, most significant first. */
  targetMuscles: string[];
  /** Short setup cues surfaced while the athlete rests before this exercise. */
  prepCues: string[];
  aiTip: string;
  /** Explicit rest override in seconds. Omit to let the planner derive it. */
  restSeconds?: number;
  previousWeight?: number;
  previousReps?: string;
  suggestedWeight?: number;
}

export const MOCK_WORKOUT_DETAIL = {
  id: "w1",
  title: "Upper Body Power",
  description: "A comprehensive upper body strength session focusing on chest, shoulders, and triceps. Designed to increase push power and muscle hypertrophy using progressive overload principles.",
  imageUri: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
  difficulty: "Advanced",
  duration: "45 min",
  calories: 320,
  totalExercises: 6,
  totalSets: 24,
  rating: 4.9,
  reviewsCount: 1240,
  timesCompleted: "15k+",
  completionRate: 85,
  estimatedRecovery: "24-48h",
  isTrending: true,

  aiRecommendation: {
    generatedAt: "Just now",
    reasons: [
      "Your upper body is fully recovered (94%)",
      "You've maintained a 5-day streak",
      "Aligns perfectly with your weekly strength goal",
      "Matches your preferred 45-minute window"
    ],
    targetMuscles: {
      primary: ["Chest", "Shoulders", "Triceps"],
      secondary: ["Core", "Front Delts"]
    },
    equipment: ["Dumbbells", "Bench", "Resistance Bands"],
    benefits: [
      { text: "Burn approximately 320 kcal", icon: "fire" },
      { text: "Build upper-body strength", icon: "arm-flex" },
      { text: "Improve muscular endurance", icon: "chart-line-variant" },
      { text: "Progress toward your weekly goal", icon: "target" }
    ],
    coachingTip: "Focus on controlled eccentric movements today (lowering the weight slowly). Quality repetitions will maximize muscle activation and reduce injury risk."
  },

  exercises: [
    {
      id: "e1",
      name: "Dumbbell Bench Press",
      sets: 4,
      reps: "8-10",
      duration: "5 min",
      equipment: ["Dumbbells", "Bench"],
      difficulty: "Intermediate",
      category: "strength",
      imageUri: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format&fit=crop",
      instructions: [
        "Lie flat on the bench with dumbbells directly above your chest.",
        "Slowly lower the dumbbells until they are level with your chest.",
        "Push back up explosively."
      ],
      mistakes: ["Flaring elbows too wide", "Lifting head off the bench"],
      targetMuscles: ["Chest", "Triceps", "Front Delts"],
      prepCues: ["Keep elbows tucked at about 45 degrees.", "Set your shoulder blades before you unrack."],
      aiTip: "Keep your shoulder blades retracted and core tight for maximum stability.",
      previousWeight: 32.5,
      previousReps: "8",
      suggestedWeight: 35
    },
    {
      id: "e2",
      name: "Incline Dumbbell Press",
      sets: 4,
      reps: "10-12",
      duration: "5 min",
      equipment: ["Dumbbells", "Bench"],
      difficulty: "Intermediate",
      category: "strength",
      imageUri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop",
      instructions: [
        "Set the bench to a 30-45 degree incline.",
        "Press dumbbells upward, focusing on the upper chest."
      ],
      mistakes: ["Setting the incline too high (targets shoulders too much)"],
      targetMuscles: ["Upper Chest", "Front Delts", "Triceps"],
      prepCues: ["Set the bench between 30 and 45 degrees.", "Keep your ribs down and spine neutral."],
      aiTip: "Focus on the squeeze at the top of the movement.",
      previousWeight: 27.5,
      previousReps: "10",
      suggestedWeight: 27.5
    },
    {
      id: "e3",
      name: "Overhead Dumbbell Press",
      sets: 4,
      reps: "8-10",
      duration: "4 min",
      equipment: ["Dumbbells", "Bench"],
      difficulty: "Advanced",
      category: "strength",
      imageUri: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=500&auto=format&fit=crop",
      instructions: [
        "Sit with back support.",
        "Press dumbbells overhead until arms are fully extended."
      ],
      mistakes: ["Arching lower back excessively"],
      targetMuscles: ["Shoulders", "Triceps", "Core"],
      prepCues: ["Brace your core before the first rep.", "Maintain a neutral spine as you press."],
      aiTip: "Brace your core hard before initiating the press."
    },
    {
      id: "e4",
      name: "Lateral Raises",
      sets: 4,
      reps: "12-15",
      duration: "4 min",
      equipment: ["Dumbbells"],
      difficulty: "Beginner",
      category: "stability",
      imageUri: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=500&auto=format&fit=crop",
      instructions: [
        "Stand tall, raise dumbbells out to your sides until parallel with the floor.",
        "Lower under control."
      ],
      mistakes: ["Using momentum to swing the weights up"],
      targetMuscles: ["Side Delts", "Traps"],
      prepCues: ["Reduce swing and lead with your elbows.", "Relax your shoulders away from your ears."],
      aiTip: "Think about pushing the weights 'away' from you, not just 'up'."
    },
    {
      id: "e5",
      name: "Overhead Tricep Extension",
      sets: 4,
      reps: "10-12",
      duration: "4 min",
      equipment: ["Dumbbells"],
      difficulty: "Intermediate",
      category: "strength",
      imageUri: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=500&auto=format&fit=crop",
      instructions: [
        "Hold a single heavy dumbbell overhead with both hands.",
        "Lower it behind your head by bending your elbows.",
        "Extend arms fully."
      ],
      mistakes: ["Letting elbows flare out too much"],
      targetMuscles: ["Triceps", "Core"],
      prepCues: ["Keep your upper arms beside your ears.", "Control your breathing through each rep."],
      aiTip: "Keep your upper arms locked in place next to your ears."
    },
    {
      id: "e6",
      name: "Resistance Band Push-downs",
      sets: 4,
      reps: "15-20",
      duration: "3 min",
      equipment: ["Resistance Bands"],
      difficulty: "Beginner",
      category: "conditioning",
      imageUri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
      instructions: [
        "Attach band to a high anchor.",
        "Keep elbows tucked, push hands down until arms are straight."
      ],
      mistakes: ["Moving the upper arm during the exercise"],
      targetMuscles: ["Triceps", "Forearms"],
      prepCues: ["Keep elbows tucked and still.", "Check the band anchor is secure."],
      aiTip: "This is a great finisher. Focus entirely on the tricep burn and pump."
    }
  ] as WorkoutDetailExercise[]
};
