export const InterestsEnum = {
  TECH: "TECH",
  HEALTH: "HEALTH",
  SUSTAINABILITY: "SUSTAINABILITY",
  TRAVEL: "TRAVEL",
  FASHION: "FASHION",
} as const;

export type InterestsEnum = keyof typeof InterestsEnum;
