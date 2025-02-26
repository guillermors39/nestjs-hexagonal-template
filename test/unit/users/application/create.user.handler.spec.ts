import { CreateUserHandler } from 'src/users/application/handlers/create.user.handler';
import { ICreateUserRepository } from 'src/users/domain/contracts/user.repository.interface';
import { ICreateUserValidationService } from 'src/users/domain/contracts/user.services.interface';
import { UserEntity } from 'src/users/domain/entities/user.entity';
import { CreateUserDtoBuilder } from 'test/mocks/dtos/create.user.builder';
import { UserEntityMother } from 'test/mocks/user.entity.mother';

describe(CreateUserHandler.name, () => {
  const repository: jest.Mocked<ICreateUserRepository> = {
    create: jest.fn((dto) => Promise.resolve(UserEntityMother.random(dto))),
  };

  const validator: jest.Mocked<ICreateUserValidationService> = {
    validate: jest.fn((entity) => Promise.resolve(undefined)),
  };

  const handler = new CreateUserHandler(repository, validator);

  it('should create an user', async () => {
    const dto = CreateUserDtoBuilder.random();

    const result = await handler.execute(dto);

    expect(repository.create).toHaveBeenCalled();

    expect(result).toBeInstanceOf(UserEntity);
  });
});
