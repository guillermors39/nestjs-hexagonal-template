import { TDatabaseConfig } from '../configs/database';
import { Db, MongoClient } from 'mongodb';
import { IDatabaseConnection } from '../interfaces/services.interface';

export class DatabaseConnection implements IDatabaseConnection {
  constructor(
    private readonly client: MongoClient,
    private readonly config: TDatabaseConfig,
  ) {}

  async onModuleDestroy() {
    await this.client?.close();
  }

  connection(): MongoClient {
    return this.client;
  }

  backmuchosol(): Db {
    return this.client.db(this.config.dbName);
  }
}
