import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DateFNSProvider } from "@shared/container/providers/DateProvider/implementations/DateFNSProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateFNSProvider: DateFNSProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Password Use case", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateFNSProvider = new DateFNSProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateFNSProvider,
      mailProviderInMemory
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
    const email = "userone@email.com";

    await usersRepositoryInMemory.create({
      name: "user@one",
      password: "pass@123",
      email,
      driver_license: "driver@license",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("random_email@email.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("Should be able to create an users token", async () => {
    const gererateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    const email = "userone@email.com";

    await usersRepositoryInMemory.create({
      name: "user@one",
      password: "pass@123",
      email,
      driver_license: "driver@license",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(gererateTokenMail).toHaveBeenCalled();
  });
});
