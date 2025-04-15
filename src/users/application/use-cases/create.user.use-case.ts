import { Inject, Injectable } from '@nestjs/common';
import { ICreateUserRepository } from 'src/users/domain/contracts/user.repository.interface';
import { ICreateUserValidationService } from 'src/users/domain/contracts/user.services.interface';
import { TCreateUserDto } from 'src/users/domain/contracts/user.type';
import { UserEntity } from 'src/users/domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(ICreateUserRepository)
    private readonly repository: ICreateUserRepository,
    @Inject(ICreateUserValidationService)
    private readonly validation: ICreateUserValidationService,
  ) {}

  async execute(dto: TCreateUserDto): Promise<UserEntity> {
    const createEntity = UserEntity.create(dto);

    await this.validation.validate(createEntity);

    const newEntity = await this.repository.create(createEntity);

    return newEntity;
  }
}
