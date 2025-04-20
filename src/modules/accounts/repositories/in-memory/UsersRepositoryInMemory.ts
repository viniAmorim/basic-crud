import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, name, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(user_id: string): Promise<User> {
    return this.users.find((user) => user.id === user_id);
  }
  async findAll(name?: string, email?: string): Promise<User[]> {
    return this.users.filter((user) => {
      const matchName = name ? user.name.includes(name) : true;
      const matchEmail = email ? user.email.includes(email) : true;
      return matchName && matchEmail;
    });
  }

  async deleteById(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async update(id: string, data: Partial<ICreateUserDTO>): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...data,
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }
}

export { UsersRepositoryInMemory };
