/** convertMinutesToHoursAndMinutes
 * Converts minutes into hours and minutes in the format "Xh Ym".
 * @param minutes - Total minutes to be converted.
 * @returns A string representing hours and minutes, e.g., "2h 30m".
 */

export const convertMinutesToHoursAndMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

/** convertDateToFormattedString
 * Converts a date string in the format "YYYY-MM-DD" to "Month DD, YYYY".
 * @param dateString - The input date string to convert.
 * @returns A formatted string like "December 26, 2024".
 */

export const convertDateToFormattedString = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

/**
 * extractCountries
 * Extracts country names from an array of objects containing country information.
 * @param countries - An array of objects, each having a 'name' property.
 * @returns An array of country names as strings.
 */

export const extractCountries = (countries: { name: string }[]): string[] => {
  return countries.map((country) => country.name);
};

/**
 * extractCompanies
 * Extracts production company names from an array of objects.
 * @param companies - An array of objects, each having a 'name' property.
 * @returns An array of country names as strings.
 */

export const extractCompanies = (companies: { name: string }[]): string[] => {
  return companies.map((company) => company.name);
};
