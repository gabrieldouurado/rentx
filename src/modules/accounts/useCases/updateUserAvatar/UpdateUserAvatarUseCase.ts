import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersReposotory: UsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersReposotory.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersReposotory.create(user);
  }
}

export { UpdateUserAvatarUseCase };
