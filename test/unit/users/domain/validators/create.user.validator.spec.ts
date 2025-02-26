import { ValidationException } from '@shared/domain/exceptions/validation.exception';
import { CreateUserValidator } from 'src/users/domain/validators/create.user.validator';
import { UserEntityMother } from 'test/mocks/user.entity.mother';

describe(CreateUserValidator.name, () => {
  const validator = new CreateUserValidator();

  it('instance', () => {
    expect(validator.key()).toEqual(expect.any(String));
  });

  describe('Sucess', () => {
    it('should success', () => {
      const resut = validator.validate(UserEntityMother.random(), {
        emailFound: undefined,
      });

      expect(resut).toEqual(
        expect.objectContaining({
          success: true,
        }),
      );
    });

    it('same entity', () => {
      const entity = UserEntityMother.random();

      const resut = validator.validate(entity, {
        emailFound: entity,
      });

      expect(resut).toEqual(
        expect.objectContaining({
          success: true,
        }),
      );
    });
  });

  describe('Errors', () => {
    it('should has errors', () => {
      const entity = UserEntityMother.random();

      const resut = validator.validate(entity, {
        emailFound: UserEntityMother.random({ email: entity.email }),
      });

      expect(resut).toEqual(
        expect.objectContaining({
          success: false,
          errors: expect.objectContaining({
            email: expect.any(String),
          }),
        }),
      );
    });

    it('should throw exception with message', () => {
      const entity = UserEntityMother.random();

      expect(() =>
        validator.validateOrFail(entity, {
          emailFound: UserEntityMother.random({ email: entity.email }),
        }),
      ).toThrow(ValidationException);

      try {
        validator.validateOrFail(entity, {
          emailFound: UserEntityMother.random({ email: entity.email }),
        });
      } catch (error) {
        expect(error.message).toEqual(expect.any(String));
      }
    });
  });
});
