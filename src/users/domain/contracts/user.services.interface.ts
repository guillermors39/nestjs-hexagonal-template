import {
  IValidation,
  IValidationService,
} from '@shared/domain/contracts/validator.interface';
import { UserEntity } from '../entities/user.entity';

export type TUserValidationContext = {
  emailFound: UserEntity | undefined;
};

export type IUserValidation = IValidation<UserEntity, TUserValidationContext>;

export type ICreateUserValidationService = IValidationService<UserEntity>;

export const ICreateUserValidationService = Symbol(
  'ICreateUserValidationService',
);
