// eslint-disable-next-line import/no-unresolved
import { AppError } from "@errors/AppError";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DateFNSProvider } from "@shared/container/providers/DateProvider/implementations/DateFNSProvider";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateFNSProvider: DateFNSProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticated User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateFNSProvider = new DateFNSProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateFNSProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@test.com",
      password: "1234",
      name: "User test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an non existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "incorrectpass@test.com",
      password: "1234",
      name: "User test",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "incorrectpass@test.com",
        password: "incorrectPass",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
