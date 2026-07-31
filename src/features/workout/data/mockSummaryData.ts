export interface SummaryAchievement {
  id: string;
  title: string;
  icon: string;
  color: string;
}

export interface SummaryMetric {
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export interface WorkoutSummaryData {
  id: string;
  completedAt: Date;
  metrics: {
    duration: string;
    calories: string;
    exercises: number;
    sets: number;
    reps: number;
    volumeKg: string;
  };
  comparisons: {
    volume: SummaryMetric;
    calories: SummaryMetric;
    duration: SummaryMetric;
  };
  aiHighlights: string[];
  achievements: SummaryAchievement[];
  xp: {
    earned: number;
    currentLevel: number;
    progressPercentage: number;
  };
  recoveryOutlook: {
    estimatedHours: number;
    nextRecommendation: string;
    hydrationTip: string;
    sleepTip: string;
  };
}

export const mockSummaryData: WorkoutSummaryData = {
  id: "w_12345",
  completedAt: new Date(),
  metrics: {
    duration: "47",
    calories: "432",
    exercises: 8,
    sets: 32,
    reps: 356,
    volumeKg: "8,250",
  },
  comparisons: {
    volume: { value: "8,250 kg", trend: "up", trendValue: "12%" },
    calories: { value: "432 kcal", trend: "up", trendValue: "8%" },
    duration: { value: "47 min", trend: "down", trendValue: "5%" },
  },
  aiHighlights: [
    "Excellent workout consistency today.",
    "You lifted 12% more volume than last week.",
    "Upper-body strength continues to improve.",
    "You maintained an ideal workout pace."
  ],
  achievements: [
    { id: "pr_1", title: "New Personal Record", icon: "trophy", color: "#FFD700" },
    { id: "str_7", title: "7-Day Streak", icon: "fire", color: "#FF4500" },
    { id: "con_1", title: "Consistency Badge", icon: "medal", color: "#4CAF50" }
  ],
  xp: {
    earned: 250,
    currentLevel: 14,
    progressPercentage: 85,
  },
  recoveryOutlook: {
    estimatedHours: 18,
    nextRecommendation: "Lower Body Strength",
    hydrationTip: "Drink approximately 600 mL of water",
    sleepTip: "Aim for 7–9 hours"
  }
};
