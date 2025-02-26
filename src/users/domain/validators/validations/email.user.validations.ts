import { TValidationEither } from '@shared/domain/contracts/validator.interface';
import {
  IUserValidation,
  TUserValidationContext,
} from '../../contracts/user.services.interface';
import { UserEntity } from '../../entities/user.entity';

export class EmailUserValidation implements IUserValidation {
  key(): string {
    return 'email';
  }

  validate(
    entity: UserEntity,
    { emailFound }: TUserValidationContext,
  ): TValidationEither {
    const result: TValidationEither = {
      success: true,
      errors: {},
    };

    if (emailFound && emailFound.id !== entity.id) {
      result.success = false;
      result.errors = `<${emailFound.email}> already in use`;
    }

    return result;
  }
}
