import { faker } from '@faker-js/faker/.';
import * as _ from 'lodash';
import { ObjectId, WithId } from 'mongodb';
import { EUserStatus } from 'src/users/domain/contracts/user.enum';
import { UserDocument } from 'src/users/infrastructure/schemas/user.schema';

export class UserDocumentMother {
  static random(
    data: Partial<WithId<UserDocument>> = {},
  ): WithId<UserDocument> {
    const base: WithId<UserDocument> = {
      _id: new ObjectId(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      status: faker.helpers.enumValue(EUserStatus),
    };

    return _.merge(base, data);
  }
}
