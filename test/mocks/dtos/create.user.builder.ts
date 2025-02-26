import { faker } from '@faker-js/faker/.';
import * as _ from 'lodash';
import { TCreateUserDto } from 'src/users/domain/contracts/user.type';

export class CreateUserDtoBuilder {
  static random(data: Partial<TCreateUserDto> = {}): TCreateUserDto {
    const base: TCreateUserDto = {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    };

    return _.merge(base, data);
  }

  static withoutPhone(): TCreateUserDto {
    const { phone, ...base } = CreateUserDtoBuilder.random();

    return base;
  }
}
