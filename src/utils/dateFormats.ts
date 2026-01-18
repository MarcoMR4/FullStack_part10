// src/utils/dateFormats.ts

/**
 * Formats a date string into "DD.MM.YYYY" format.
 *
 * @param dateString - The date string to format.
 * @returns The formatted date as "DD.MM.YYYY" as a string.
 */
function formatDate(dateString: string) {
  // Si el formato es YYYY-MM-DD, parsear manualmente para evitar problemas de zona horaria
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-").map(Number);
    return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
  }
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default formatDate;
