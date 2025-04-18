import { Router } from 'express';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

usersRoutes.get('/', listUsersController.handle.bind(listUsersController));
usersRoutes.post('/', createUserController.handle.bind(createUserController));
usersRoutes.delete(
  '/:id',
  deleteUserController.handle.bind(deleteUserController),
);
usersRoutes.put('/:id', updateUserController.handle.bind(updateUserController));

export { usersRoutes };
