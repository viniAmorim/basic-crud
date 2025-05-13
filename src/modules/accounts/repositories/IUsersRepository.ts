import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
  findAll(name?: string, email?: string): Promise<User[]>;
  findAllPaginated(
    name?: string,
    email?: string,
    page?: number,
    limit?: number,
  ): Promise<[User[], number]>;
  deleteById(id: string): Promise<void>;
  update(id: string, data: Partial<ICreateUserDTO>): Promise<User>;
}

export { IUsersRepository };
