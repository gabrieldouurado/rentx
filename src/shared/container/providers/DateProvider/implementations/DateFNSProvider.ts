import { add, isBefore } from "date-fns";

import { IDateProvider } from "../IDateProvider";

class DateFNSProvider implements IDateProvider {
  dateIsBefore(date: Date, dateToCompare: Date): boolean {
    return isBefore(date, dateToCompare);
  }
  addHoursInDate(date: Date, hours: number): Date {
    return add(date, { hours });
  }
}

export { DateFNSProvider };
