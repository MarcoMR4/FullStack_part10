// src/utils/quantitiesFormatters.ts

/**
 * Formatter for numbers over 1000
 * E.g., 1500 -> 1.5k
 */
export const overThousandFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 1
});
