import { Injectable } from '@nestjs/common';
import { IMapper } from '@shared/infrastructure/interfaces/services.interface';
import { UserDocument as Base } from '../schemas/user.schema';
import { UserEntity } from 'src/users/domain/entities/user.entity';
import { WithId } from 'mongodb';

type UserDocument = WithId<Base>;

@Injectable()
export class UserMapper implements IMapper<UserDocument, UserEntity> {
  map(input: UserDocument): UserEntity;
  map(input: UserDocument[]): UserEntity[];
  map(input: UserDocument | UserDocument[]): UserEntity | UserEntity[] {
    return Array.isArray(input)
      ? input.map((item) => this.single(item))
      : this.single(input);
  }

  private single(data: UserDocument): UserEntity {
    return UserEntity.fromDto({
      id: data._id.toString(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      status: data.status,
    });
  }
}
