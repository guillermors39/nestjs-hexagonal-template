import { Inject, Injectable } from '@nestjs/common';
import { IValidationService } from '@shared/domain/contracts/validator.interface';
import { IFindByEmailUserRepository } from 'src/users/domain/contracts/user.repository.interface';
import { UserEntity } from 'src/users/domain/entities/user.entity';
import { CreateUserValidator } from 'src/users/domain/validators/create.user.validator';

@Injectable()
export class CreateUserValidationService implements IValidationService {
  constructor(
    @Inject(IFindByEmailUserRepository)
    private readonly repository: IFindByEmailUserRepository,
    private readonly validator: CreateUserValidator,
  ) {}

  async validate(entity: UserEntity): Promise<void> {
    const found = await this.repository.findByEmail(entity.email);

    this.validator.validateOrFail(entity, { emailFound: found });
  }
}
