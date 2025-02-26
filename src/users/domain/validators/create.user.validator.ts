import { Validator } from '@shared/domain/validators/base.validator';
import { UserEntity } from '../entities/user.entity';
import { TUserValidationContext } from '../contracts/user.services.interface';
import { IValidation } from '@shared/domain/contracts/validator.interface';
import { EmailUserValidation } from './validations/email.user.validations';

export class CreateUserValidator extends Validator<
  UserEntity,
  TUserValidationContext
> {
  key(): string {
    return 'user';
  }

  protected message(): string {
    return 'User cannot be created';
  }

  protected validations(): IValidation<UserEntity, TUserValidationContext>[] {
    return [new EmailUserValidation()];
  }
}
