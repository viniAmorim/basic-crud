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

  async create({
    name,
    email,
    phone,
    password,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      phone,
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

  async findAll(name?: string, email?: string): Promise<User[]> {
    const usersQuery = await this.repository.createQueryBuilder('c');

    if (name) {
      usersQuery.andWhere('c.name = :name', { name });
    }
    if (email) {
      usersQuery.andWhere('c.email = :email', { email });
    }

    const users = await usersQuery.getMany();

    return users;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(id: string, data: Partial<ICreateUserDTO>): Promise<User> {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  async findAllPaginated(
    name?: string,
    email?: string,
    page = 1,
    limit = 10,
  ): Promise<[User[], number]> {
    const query = this.repository.createQueryBuilder('user');

    if (name) {
      query.andWhere('LOWER(user.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    if (email) {
      query.andWhere('LOWER(user.email) LIKE LOWER(:email)', {
        email: `%${email}%`,
      });
    }

    query.orderBy('user.created_at', 'DESC');
    query.skip((page - 1) * limit).take(limit);

    const [users, total] = await query.getManyAndCount();
    return [users, total];
  }
}

export { UsersRepository };
