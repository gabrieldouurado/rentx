import { add, intervalToDuration, isAfter, isBefore } from "date-fns";

import { IDateProvider } from "../IDateProvider";

class DateFNSProvider implements IDateProvider {
  dateIsBefore(date: Date, dateToCompare: Date): boolean {
    return isBefore(date, dateToCompare);
  }

  dateIsAfter(date: Date, dateToCompare: Date): boolean {
    return isAfter(date, dateToCompare);
  }

  addHoursInDate(date: Date, hours: number): Date {
    return add(date, { hours });
  }

  countDays(start: Date, end: Date): number {
    const interval = intervalToDuration({ start, end });

    const { days } = interval;

    return days;
  }
}

export { DateFNSProvider };
