/**
 *
 * @param object
 * @returns
 */
export function objectKeys<T extends Record<string, unknown>>(
  object: T
): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}
