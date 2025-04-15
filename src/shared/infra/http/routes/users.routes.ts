import { Router } from 'express';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.get('/', (req, res) => {
  res.json({ message: 'Hello user router' });
});

usersRoutes.post('/', createUserController.handle.bind(createUserController));

export { usersRoutes };
