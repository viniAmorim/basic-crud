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

  async findAllPaginated(
    name?: string,
    email?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<[User[], number]> {
    let filteredUsers = [...this.users];

    if (name) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase()),
      );
    }

    const total = filteredUsers.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return [paginatedUsers, total];
  }
}

export { UsersRepositoryInMemory };
