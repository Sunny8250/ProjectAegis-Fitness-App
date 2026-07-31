import { colors } from "./colors";

export * from "./colors";
export * from "./responsive";
export * from "./spacing";
export * from "./typography";
export * from "./radius";
export * from "./shadows";

/**
 * Strongly typed app theme shape based on the light colour theme.
 */
export type AppTheme = typeof colors.light;
