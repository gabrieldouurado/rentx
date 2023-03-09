import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DateFNSProvider } from "@shared/container/providers/DateProvider/implementations/DateFNSProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateFNSProvider: DateFNSProvider;

let car: Car;
let car_2: Car;

describe("Create Rental", () => {
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dateFNSProvider = new DateFNSProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateFNSProvider,
      carsRepositoryInMemory
    );

    car = await carsRepositoryInMemory.create({
      name: "test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 40,
      category_id: "car@category",
      brand: "car@brand",
    });

    car_2 = await carsRepositoryInMemory.create({
      name: "test-02",
      description: "Car Test 02",
      daily_rate: 100,
      license_plate: "EDF-123",
      fine_amount: 40,
      category_id: "car@category",
      brand: "car@brand",
    });
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user-1234",
      car_id: car.id,
      expected_return_date: dateFNSProvider.addHoursInDate(new Date(), 26),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental when the user has any open rent", async () => {
    const userMock = "user-1234";

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: userMock,
        car_id: car.id,
        expected_return_date: dateFNSProvider.addHoursInDate(new Date(), 26),
      });

      await createRentalUseCase.execute({
        user_id: userMock,
        car_id: car_2.id,
        expected_return_date: dateFNSProvider.addHoursInDate(new Date(), 26),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental when the car has any open rent", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user-1111",
        car_id: car.id,
        expected_return_date: dateFNSProvider.addHoursInDate(new Date(), 26),
      });

      await createRentalUseCase.execute({
        user_id: "user-2222",
        car_id: car.id,
        expected_return_date: dateFNSProvider.addHoursInDate(new Date(), 26),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user-1111",
        car_id: car.id,
        expected_return_date: dateFNSProvider.addHoursInDate(new Date(), 12),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
