import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("shold be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Descripton car",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("shold be able to create a car with exists license plate", async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Descripton car",
        daily_rate: 100,
        license_plate: "abc1234",
        fine_amount: 60,
        brand: "brand",
        category_id: "Category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Descripton car",
        daily_rate: 100,
        license_plate: "abc1234",
        fine_amount: 60,
        brand: "brand",
        category_id: "Category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shold be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Descripton car",
      daily_rate: 100,
      license_plate: "AAA-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "Category",
    });

    expect(car.available).toBe(true);
  });
});
