import { Module } from '@nestjs/common';
import { CreateUserController } from './infrastructure/controllers';
import { CreateUserUseCase } from './application/use-cases/create.user.use-case';
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

const useCases = [CreateUserUseCase];

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
  providers: [...useCases, ...repositories, ...validators, ...mappers],
  controllers: [CreateUserController],
})
export class UsersModule {}
