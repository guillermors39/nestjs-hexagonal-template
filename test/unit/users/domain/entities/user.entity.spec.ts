import { faker } from '@faker-js/faker/.';
import { EUserStatus } from 'src/users/domain/contracts/user.enum';
import { UserEntity } from 'src/users/domain/entities/user.entity';
import { CreateUserDtoBuilder } from 'test/mocks/dtos/create.user.builder';

describe(UserEntity.name, () => {
  it('should create an instace', () => {
    const dto = CreateUserDtoBuilder.random();

    const entity = UserEntity.fromDto({
      id: faker.database.mongodbObjectId(),
      ...dto,
      status: EUserStatus.ACTIVE,
    });

    expect(entity).toBeInstanceOf(UserEntity);
  });
});
