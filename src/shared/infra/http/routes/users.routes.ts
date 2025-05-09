import { Router } from 'express';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { ensureAdmin } from '../middleware/ensureAdmin';
import { FindUserByIdController } from '@modules/accounts/useCases/findUserById/FindUserByIdController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const findUserByIdController = new FindUserByIdController();

usersRoutes.get('/', listUsersController.handle.bind(listUsersController));
usersRoutes.post('/', createUserController.handle.bind(createUserController));
usersRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteUserController.handle.bind(deleteUserController),
);
usersRoutes.put(
  '/:id',
  ensureAuthenticated,
  updateUserController.handle.bind(updateUserController),
);

usersRoutes.get(
  '/:id',
  findUserByIdController.handle.bind(findUserByIdController),
);

export { usersRoutes };
