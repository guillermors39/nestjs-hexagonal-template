import { faker } from '@faker-js/faker/.';
import * as _ from 'lodash';
import { EUserStatus } from 'src/users/domain/contracts/user.enum';
import { TUserDto, UserEntity } from 'src/users/domain/entities/user.entity';

export class UserEntityMother {
  static random(data: Partial<TUserDto> = {}): UserEntity {
    const base: TUserDto = {
      id: faker.database.mongodbObjectId().toString(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      status: faker.helpers.enumValue(EUserStatus),
    };

    return UserEntity.fromDto(_.merge(base, data));
  }
}
