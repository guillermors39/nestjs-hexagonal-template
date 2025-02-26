import { Module } from '@nestjs/common';
import { CreateUserController } from './infrastructure/controllers';
import { CreateUserHandler } from './application/handlers/create.user.handler';
import {
  ICreateUserRepository,
  IFindByEmailUserRepository,
} from './domain/contracts/user.repository.interface';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DatabaseModule } from '@shared/database.module';
import { UserMapper } from './infrastructure/services/user.mapper';
import { CreateUserValidator } from './domain/validators/create.user.validator';
import { ICreateUserValidationService } from './domain/contracts/user.services.interface';
import { CreateUserValidationService } from './infrastructure/services/create.user.validation.service';

const handlers = [CreateUserHandler];

const repositories = [
  {
    provide: ICreateUserRepository,
    useClass: UserRepository,
  },
  {
    provide: IFindByEmailUserRepository,
    useClass: UserRepository,
  },
];

const validators = [
  CreateUserValidator,
  {
    provide: ICreateUserValidationService,
    useClass: CreateUserValidationService,
  },
];

const mappers = [UserMapper];

@Module({
  imports: [DatabaseModule],
  providers: [...handlers, ...repositories, ...validators, ...mappers],
  controllers: [CreateUserController],
})
export class UsersModule {}
