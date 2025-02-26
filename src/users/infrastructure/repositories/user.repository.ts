import { Inject, Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { IUserRepository } from 'src/users/domain/contracts/user.repository.interface';
import { UserDocument } from '../schemas/user.schema';
import { IDatabaseConnection } from '@shared/infrastructure/interfaces/services.interface';
import { DbCollection } from '@shared/infrastructure/configs/database';
import { UserMapper } from '../services/user.mapper';
import { UserEntity } from 'src/users/domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly model: Collection<UserDocument>;

  constructor(
    @Inject(IDatabaseConnection)
    private readonly db: IDatabaseConnection,
    private readonly mapper: UserMapper,
  ) {
    this.model = this.db
      .backmuchosol()
      .collection<UserDocument>(DbCollection.users);
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    const { insertedId } = await this.model.insertOne(entity);

    return this.mapper.map({
      _id: insertedId,
      ...entity,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const document = await this.model.findOne({ email });

    if (!document) return undefined;

    return this.mapper.map(document);
  }
}
