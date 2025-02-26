import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from '../requests/create.user.request';
import { UserResponse } from '../responses/user.response';
import { CreateUserHandler } from 'src/users/application/handlers/create.user.handler';

@Controller({ path: 'users' })
export class CreateUserController {
  constructor(private readonly handler: CreateUserHandler) {}

  @Post()
  async create(@Body() dto: CreateUserRequest): Promise<UserResponse> {
    const entity = await this.handler.execute(dto);

    return new UserResponse(entity);
  }
}
