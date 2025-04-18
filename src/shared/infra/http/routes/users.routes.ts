import { Router } from 'express';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();

usersRoutes.get('/', listUsersController.handle.bind(listUsersController));
usersRoutes.post('/', createUserController.handle.bind(createUserController));
usersRoutes.delete(
  '/:id',
  deleteUserController.handle.bind(deleteUserController),
);

export { usersRoutes };
