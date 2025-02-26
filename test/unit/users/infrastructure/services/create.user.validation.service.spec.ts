import { IFindByEmailUserRepository } from 'src/users/domain/contracts/user.repository.interface';
import { CreateUserValidator } from 'src/users/domain/validators/create.user.validator';
import { CreateUserValidationService } from 'src/users/infrastructure/services/create.user.validation.service';
import { UserEntityMother } from 'test/mocks/user.entity.mother';

describe(CreateUserValidationService.name, () => {
  const repository: jest.Mocked<IFindByEmailUserRepository> = {
    findByEmail: jest.fn(),
  };

  const validator = new CreateUserValidator();

  const spyValidator = jest.spyOn(validator, 'validateOrFail');

  const validation = new CreateUserValidationService(repository, validator);

  it('should resolve void', async () => {
    const entity = UserEntityMother.random();

    repository.findByEmail.mockImplementationOnce(() =>
      Promise.resolve(undefined),
    );
    spyValidator.mockImplementationOnce(() => ({ success: true, errors: {} }));

    await expect(validation.validate(entity)).resolves.toBeUndefined();

    expect(repository.findByEmail).toHaveBeenCalledWith(entity.email);
    expect(spyValidator).toHaveBeenCalled();
  });
});
