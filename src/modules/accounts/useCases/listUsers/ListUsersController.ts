import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from './ListUsersUseCase';
import { instanceToPlain } from 'class-transformer';

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, page = 1, limit = 10 } = request.query;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const result = await listUsersUseCase.execute({
      name: name as string,
      email: email as string,
      page: Number(page),
      limit: Number(limit),
    });

    return response.json(instanceToPlain(result));
  }
}

export { ListUsersController };
