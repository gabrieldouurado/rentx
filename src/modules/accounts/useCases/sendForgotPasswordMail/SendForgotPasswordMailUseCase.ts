import { randomUUID } from "node:crypto";
import { inject, injectable } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
    @inject("DateFNSProvider")
    private dateFNSProvider: IDateProvider
  ) {}
  async execute(email: string) {
    const hoursToExpiresPasswordToken = 3;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = randomUUID();

    const expires_date = this.dateFNSProvider.addHoursInDate(
      new Date(),
      hoursToExpiresPasswordToken
    );

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
  }
}

export { SendForgotPasswordMailUseCase };