export const MOCK_ANALYTICS_DATA = {
  hero: {
    fitnessScore: 87,
    scoreLabel: "Excellent",
    workoutStreak: 12,
    weeklyGoalProgress: 4, // 4 out of 5 days
    weeklyGoalTarget: 5,
    monthlyGoalProgress: 18,
    monthlyGoalTarget: 20,
    xp: 14500,
    level: 24,
    nextLevelXp: 15000,
  },
  aiInsights: [
    "Strength improved by 8% over the last month.",
    "Workout consistency has increased significantly.",
    "Chest is progressing faster than shoulders.",
    "Recovery quality improved by prioritizing sleep.",
    "Consider training legs more frequently to balance development."
  ],
  progressCharts: {
    volume: [
      { value: 12000, label: "Mon" },
      { value: 15000, label: "Tue" },
      { value: 0, label: "Wed" },
      { value: 18000, label: "Thu" },
      { value: 14000, label: "Fri" },
      { value: 20000, label: "Sat" },
      { value: 0, label: "Sun" },
    ],
    calories: [
      { value: 450, label: "Mon" },
      { value: 520, label: "Tue" },
      { value: 0, label: "Wed" },
      { value: 600, label: "Thu" },
      { value: 480, label: "Fri" },
      { value: 700, label: "Sat" },
      { value: 0, label: "Sun" },
    ],
    consistency: [
      { value: 3, label: "Week 1" },
      { value: 4, label: "Week 2" },
      { value: 4, label: "Week 3" },
      { value: 5, label: "Week 4" },
    ]
  },
  muscleHeatMap: {
    frequentlyTrained: ["chest", "biceps", "quads"],
    undertrained: ["calves", "rear_delts", "hamstrings"],
    recovering: ["triceps", "lats"],
    neglected: ["forearms", "abs"]
  }
};
