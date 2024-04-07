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

/**
 *
 * @param value
 * @returns
 */
export function parseAmount(value: number): string {
  const formatter = new Intl.NumberFormat("sk-SK", {
    style: "currency", // You can customize formatting here (e.g., 'currency', 'percent')
    currency: "EUR",
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
}
