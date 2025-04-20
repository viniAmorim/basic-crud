import 'reflect-metadata';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Delete User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should delete a user by ID', async () => {
    await createUserUseCase.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });

    const user = await usersRepositoryInMemory.findByEmail('test@example.com');

    await deleteUserUseCase.execute({ id: user.id });

    const deletedUser = await usersRepositoryInMemory.findById(user.id);

    expect(deletedUser).toBeUndefined();
  });

  it('should not throw if user does not exist (silent delete)', async () => {
    await expect(
      deleteUserUseCase.execute({ id: 'non-existent-id' }),
    ).resolves.not.toThrow();
  });
});
