import { CreateUserUseCase } from './CreateUserUseCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    await expect(
      createUserUseCase.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      }),
    ).resolves.not.toThrow();

    const createdUser =
      await usersRepositoryInMemory.findByEmail('john@example.com');

    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe('John Doe');
    expect(createdUser.email).toBe('john@example.com');
    expect(createdUser.password).not.toBe('123456'); // Deve estar criptografada
  });

  it('should not allow creation of a user with an existing email', async () => {
    await createUserUseCase.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
    });

    await expect(
      createUserUseCase.execute({
        name: 'Jane Again',
        email: 'jane@example.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('User already exists'));
  });
});
