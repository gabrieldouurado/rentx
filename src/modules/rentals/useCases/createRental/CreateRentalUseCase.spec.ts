import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user-1234",
      car_id: "car-1234",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental when the user has any open rent", async () => {
    const userMock = "user-1234";

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: userMock,
        car_id: "car-1111",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: userMock,
        car_id: "car-2222",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental when the car has any open rent", async () => {
    const carMock = "car-1234";

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user-1111",
        car_id: carMock,
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "user-2222",
        car_id: carMock,
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
