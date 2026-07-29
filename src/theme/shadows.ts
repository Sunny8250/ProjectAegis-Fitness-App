/**
 * Subtle elevation tokens for cards, with reduced intensity in dark mode.
 */
export const shadows = {
  card: {
    light: {
      shadowColor: "#111827",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 2,
    },
    dark: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
    },
  },
} as const;
