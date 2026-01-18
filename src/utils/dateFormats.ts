// src/utils/dateFormats.ts

/**
 * Formats a date string into "DD.MM.YYYY" format.
 *
 * @param dateString - The date string to format.
 * @returns The formatted date as "DD.MM.YYYY" as a string.
 */
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default formatDate;
