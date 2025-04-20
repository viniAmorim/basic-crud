import 'reflect-metadata';
import { ListUsersUseCase } from './ListUsersUseCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

let listUsersUseCase: ListUsersUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('List Users', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    // Criação de usuários de exemplo
    await createUserUseCase.execute({
      name: 'Alice',
      email: 'alice@example.com',
      password: '123456',
    });

    await createUserUseCase.execute({
      name: 'Bob',
      email: 'bob@example.com',
      password: '123456',
    });
  });

  it('should list all users', async () => {
    const users = await listUsersUseCase.execute({});

    expect(users.length).toBe(2);
    expect(users[0]).toHaveProperty('id');
    expect(users[1]).toHaveProperty('id');
  });

  it('should filter users by name', async () => {
    const users = await listUsersUseCase.execute({ name: 'Alice' });

    expect(users.length).toBe(1);
    expect(users[0].name).toBe('Alice');
  });

  it('should filter users by email', async () => {
    const users = await listUsersUseCase.execute({ email: 'bob@example.com' });

    expect(users.length).toBe(1);
    expect(users[0].email).toBe('bob@example.com');
  });

  it('should return an empty array if no user matches the filter', async () => {
    const users = await listUsersUseCase.execute({ name: 'NonExistent' });

    expect(users).toEqual([]);
  });
});
