import 'reflect-metadata';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateUserUseCase: UpdateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Update User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should update a user name and email', async () => {
    await createUserUseCase.execute({
      name: 'Original Name',
      email: 'original@example.com',
      password: '123456',
    });

    const user = await usersRepositoryInMemory.findByEmail(
      'original@example.com',
    );

    const updatedUser = await updateUserUseCase.execute({
      id: user.id,
      name: 'Updated Name',
      email: 'updated@example.com',
    });

    expect(updatedUser.name).toBe('Updated Name');
    expect(updatedUser.email).toBe('updated@example.com');
  });

  it('should throw error if user does not exist', async () => {
    await expect(
      updateUserUseCase.execute({
        id: 'non-existent-id',
        name: 'New Name',
      }),
    ).rejects.toThrow('User not found');
  });
});
