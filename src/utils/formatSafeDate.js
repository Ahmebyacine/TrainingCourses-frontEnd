import { format } from 'date-fns';

export const formatSafeDate = (date, fallback = 'N/A') => {
    try {
      return date ? format(new Date(date), "MM/dd/yyyy") : fallback;
    } catch {
      return fallback;
    }
  };
export const formatSafeDateMinutes = (date, fallback = 'N/A') => {
    try {
      return date ? format(new Date(date), "MM/dd/yyyy hh:mm") : fallback;
    } catch {
      return fallback;
    }
  };