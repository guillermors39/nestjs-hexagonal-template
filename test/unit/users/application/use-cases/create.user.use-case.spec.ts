import { CreateUserUseCase } from 'src/users/application/use-cases/create.user.use-case';
import { ICreateUserRepository } from 'src/users/domain/contracts/user.repository.interface';
import { ICreateUserValidationService } from 'src/users/domain/contracts/user.services.interface';
import { UserEntity } from 'src/users/domain/entities/user.entity';
import { CreateUserDtoBuilder } from 'test/mocks/dtos/create.user.builder';
import { UserEntityMother } from 'test/mocks/user.entity.mother';

describe(CreateUserUseCase.name, () => {
  const repository: jest.Mocked<ICreateUserRepository> = {
    create: jest.fn((dto) => Promise.resolve(UserEntityMother.random(dto))),
  };

  const validator: jest.Mocked<ICreateUserValidationService> = {
    validate: jest.fn((entity) => Promise.resolve(undefined)),
  };

  const useCase = new CreateUserUseCase(repository, validator);

  it('should create an user', async () => {
    const dto = CreateUserDtoBuilder.random();

    const result = await useCase.execute(dto);

    expect(repository.create).toHaveBeenCalled();

    expect(result).toBeInstanceOf(UserEntity);
  });
});
