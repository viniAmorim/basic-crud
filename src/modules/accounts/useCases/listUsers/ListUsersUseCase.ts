import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name?: string;
  email?: string;
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAll(name, email);

    return users;
  }
}

export { ListUsersUseCase };
