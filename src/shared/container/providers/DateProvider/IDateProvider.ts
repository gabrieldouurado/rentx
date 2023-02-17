interface IDateProvider {
  dateIsBefore(date: Date, dateToCompare: Date): boolean;
  dateIsAfter(date: Date, dateToCompare: Date): boolean;
  addHoursInDate(date: Date, hours: number): Date;
  countDays(start: Date, end: Date): number;
}

export { IDateProvider };
