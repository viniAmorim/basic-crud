import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name?: string;
  email?: string;
  page: number;
  limit: number;
}

interface IResponse {
  users: User[];
  total: number;
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, page, limit }: IRequest): Promise<IResponse> {
    const [users, total] = await this.usersRepository.findAllPaginated(
      name,
      email,
      page,
      limit,
    );

    return { users, total };
  }
}

export { ListUsersUseCase };
