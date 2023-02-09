interface IDateProvider {
  dateIsBefore(date: Date, dateToCompare: Date): boolean;
  addHoursInDate(date: Date, hours: number): Date;
}

export { IDateProvider };
