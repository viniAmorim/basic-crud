import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from './ListUsersUseCase';
import { instanceToPlain } from 'class-transformer';

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.query;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const users = await listUsersUseCase.execute({
      name: name as string,
      email: email as string,
    });

    return response.json(instanceToPlain(users));
  }
}

export { ListUsersController };
