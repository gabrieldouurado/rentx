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

  it("should be able to create a new car", async () => {
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

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Descripton car",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "Category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "Descripton car",
        daily_rate: 100,
        license_plate: "abc1234",
        fine_amount: 60,
        brand: "brand",
        category_id: "Category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be able to create a car with available true by default", async () => {
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
