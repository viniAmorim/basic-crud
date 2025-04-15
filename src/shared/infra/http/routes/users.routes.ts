import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.get('/', (req, res) => {
  res.json({ message: 'Hello user router' });
});

export { usersRoutes };
