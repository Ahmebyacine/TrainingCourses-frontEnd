import { format } from "date-fns";

export const formatSafeDate = (date, fallback = "N/A") => {
  try {
    return date ? format(new Date(date), "MM/dd/yyyy") : fallback;
  } catch {
    return fallback;
  }
};
export const formatSafeDateMinutes = (date, fallback = "N/A") => {
  try {
    return date ? format(new Date(date), "MM/dd/yyyy hh:mm") : fallback;
  } catch {
    return fallback;
  }
};
export const formatFrenchDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
export const addOneYear = (date) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
};