/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IValidation,
  TValidationEither,
} from '../contracts/validator.interface';
import { ValidationException } from '../exceptions/validation.exception';

export abstract class Validator<Entity = unknown, Context = Record<string, any>>
  implements IValidation<Entity, Context>
{
  abstract key(): string;

  protected abstract validations(): IValidation<Entity, Context>[];

  protected message(): string {
    return 'There are validation errors';
  }

  public validate(entity: Entity, context?: Context): TValidationEither {
    const validations = this.validations();
    const result: TValidationEither = {
      success: true,
      errors: {},
    };

    for (const validation of validations) {
      const validationResult = validation.validate(entity, context);

      result.success &&= validationResult.success;

      if (this._hasErrors(validationResult)) {
        result.errors[validation.key()] = validationResult.errors;
      }
    }

    return result;
  }

  public validateOrFail(entity: Entity, context?: Context): void {
    const result = this.validate(entity, context);

    if (this._hasErrors(result)) {
      throw new ValidationException(result.errors, this.message());
    }
  }

  private _hasErrors(result: TValidationEither): boolean {
    return !!result.errors && Object.keys(result.errors).length > 0;
  }
}
