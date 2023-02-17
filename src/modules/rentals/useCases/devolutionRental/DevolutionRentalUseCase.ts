import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateFNSProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    const nowDate = new Date();

    let daily = this.dateProvider.countDays(
      rental.start_date,
      rental.expected_return_date
    );

    const minimumDailys = 1;
    if (daily <= 0) {
      daily = minimumDailys;
    }

    const carReturnsAfterExpectedDate = this.dateProvider.dateIsBefore(
      rental.expected_return_date,
      nowDate
    );

    let penalityDays = 0;
    let total = 0;

    if (carReturnsAfterExpectedDate) {
      penalityDays = this.dateProvider.countDays(
        rental.expected_return_date,
        nowDate
      );

      if (penalityDays > 0) {
        const calculateFine = penalityDays * car.fine_amount;
        total = calculateFine;
      }
    }

    total += daily * car.daily_rate;

    rental.end_date = nowDate;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
