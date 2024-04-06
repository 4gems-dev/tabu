export const InterestsEnum = {
  TECH: "TECH",
  HEALTH: "HEALTH",
  SUSTAINABILITY: "SUSTAINABILITY",
  TRAVEL: "TRAVEL",
  FASHION: "FASHION",
} as const;

export type InterestsEnum = keyof typeof InterestsEnum;

export const RiskToleranceEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type RiskToleranceEnum = keyof typeof RiskToleranceEnum;

export const IntervalEnum = {
  UNCERTAIN: "UNCERTAIN",
  "<1": "<1",
  "1_3": "1_3",
  "3_5": "3_5",
  "5_10": "5_10",
  "10+": "10+",
} as const;

export type IntervalEnum = keyof typeof IntervalEnum;
