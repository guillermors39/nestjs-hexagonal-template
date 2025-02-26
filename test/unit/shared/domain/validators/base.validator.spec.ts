import { faker } from '@faker-js/faker/.';
import {
  IValidation,
  TValidationEither,
} from '@shared/domain/contracts/validator.interface';
import { ValidationException } from '@shared/domain/exceptions/validation.exception';
import { Validator } from '@shared/domain/validators/base.validator';

class SimpleValidator implements IValidation {
  constructor(private readonly name: string) {}

  key(): string {
    return this.name;
  }

  public validate(entity: any): TValidationEither {
    if (entity.name && entity.name.length > 0) {
      return {
        success: true,
        errors: {},
      };
    } else {
      return {
        success: false,
        errors: 'Name is required',
      };
    }
  }
}

class ComplexValidator extends Validator {
  key(): string {
    return 'complexValidator';
  }

  protected validations(): IValidation[] {
    return [new SimpleValidator('key1'), new SimpleValidator('key2')];
  }
}

describe(Validator.name, () => {
  it('should resolve without errors', () => {
    const complexValidator = new ComplexValidator();
    const result = complexValidator.validate({ name: faker.person.fullName() });

    expect(result).toEqual(
      expect.objectContaining({
        success: true,
        errors: {},
      }),
    );
  });

  it('should resolve with errors', () => {
    const complexValidator = new ComplexValidator();
    const result = complexValidator.validate({ name: '' });

    expect(result).toEqual(
      expect.objectContaining({
        success: false,
        errors: {
          key1: expect.any(String),
          key2: expect.any(String),
        },
      }),
    );
  });

  it(`should throw ${ValidationException.name}`, () => {
    const complexValidator = new ComplexValidator();
    expect(() => complexValidator.validateOrFail({ name: '' })).toThrow(
      ValidationException,
    );
  });
});
