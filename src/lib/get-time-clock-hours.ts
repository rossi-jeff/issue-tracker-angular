import type { TimeClockType } from '../types/time-clock.type';

export const getTimeClockHours = (timeClock: TimeClockType) => {
  let hours = 0;
  if (timeClock.Start && timeClock.End) {
    const sDate =
      timeClock.Start.Date && timeClock.Start.Time
        ? new Date(`${timeClock.Start.Date} ${timeClock.Start.Time}`)
        : null;
    const eDate =
      timeClock.End.Date && timeClock.End.Time
        ? new Date(`${timeClock.End.Date} ${timeClock.End.Time}`)
        : null;
    if (sDate && eDate) {
      const ms = eDate.getTime() - sDate.getTime();
      hours = Math.round(ms / 36000) / 100;
    }
  }
  return hours.toFixed(2);
};
