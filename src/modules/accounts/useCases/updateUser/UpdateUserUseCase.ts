import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  phone: string;
  isAdmin: boolean;
  password?: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, ...data }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new Error('User not found');
    }

    const updatedUser = await this.usersRepository.update(id, data);

    return updatedUser;
  }
}

export { UpdateUserUseCase };
