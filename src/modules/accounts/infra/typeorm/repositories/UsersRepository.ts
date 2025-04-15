import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppDataSource } from '@shared/infra/typeorm/data-source';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({ name, email, password, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      id,
    });

    await this.repository.save(user);
  }

  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id: user_id } });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}

export { UsersRepository };
