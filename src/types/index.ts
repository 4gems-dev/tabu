export const InterestsEnum = {
  TECH: "TECH",
  HEALTH: "HEALTH",
  SUSTAINABILITY: "SUSTAINABILITY",
  TRAVEL: "TRAVEL",
  FASHION: "FASHION",
} as const;

export type InterestsEnum = keyof typeof InterestsEnum;

export const InterestsEnumArray = Object.values(InterestsEnum);

export type SuccessType<
  TSuccess extends Record<string, any>,
  TError extends Record<string, any> = {}
> = ({ success: true } & TSuccess) | ({ success: false } & TError);

export type OptionalTuple<T> = T | T[];

export type QueryValue = string | string[] | undefined;

export type OR2<T1, T2> = T1 | T2;
