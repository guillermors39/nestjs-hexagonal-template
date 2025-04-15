import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from '../requests/create.user.request';
import { UserResponse } from '../responses/user.response';
import { CreateUserUseCase } from 'src/users/application/use-cases/create.user.use-case';

@Controller({ path: 'users' })
export class CreateUserController {
  constructor(private readonly useCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserRequest): Promise<UserResponse> {
    const entity = await this.useCase.execute(dto);

    return new UserResponse(entity);
  }
}
