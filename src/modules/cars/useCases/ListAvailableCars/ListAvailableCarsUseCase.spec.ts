import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all avaialble cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 140,
      license_plate: "AAA-1234",
      fine_amount: 100,
      brand: "Car Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaialble cars by brand", async () => {
    const mockBrand = "Car_Brand_test";

    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 140,
      license_plate: "AAA-1234",
      fine_amount: 100,
      brand: mockBrand,
      category_id: "category_id",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      daily_rate: 140,
      license_plate: "AAA-1234",
      fine_amount: 100,
      brand: "Car_Brand_unknow",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: mockBrand,
    });

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          brand: mockBrand,
        }),
      ])
    );

    expect(cars).not.toContain(car2);
  });

  it("should be able to list all avaialble cars by name", async () => {
    const mockName = "Car1";

    await carsRepositoryInMemory.create({
      name: mockName,
      description: "Car1 description",
      daily_rate: 140,
      license_plate: "AAA-1234",
      fine_amount: 100,
      brand: "Car_Brand",
      category_id: "category_id",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      daily_rate: 140,
      license_plate: "AAA-1234",
      fine_amount: 100,
      brand: "Car_Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: mockName,
    });

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: mockName,
        }),
      ])
    );

    expect(cars).not.toContain(car2);
  });

  it("should be able to list all avaialble cars by category", async () => {
    const mockCategory = "category_test";

    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 140,
      license_plate: "AAA-1234",
      fine_amount: 100,
      brand: "Car_Brand",
      category_id: mockCategory,
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      daily_rate: 140,
      license_plate: "AAA-1234",
      fine_amount: 100,
      brand: "Car_Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: mockCategory,
    });

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category_id: mockCategory,
        }),
      ])
    );

    expect(cars).not.toContain(car2);
  });
});
