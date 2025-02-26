import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { TDatabaseConfig } from './infrastructure/configs/database';
import { DatabaseConnection } from './infrastructure/services/database-connection.service';
import { IDatabaseConnection } from './infrastructure/interfaces/services.interface';

@Module({
  providers: [
    {
      provide: IDatabaseConnection,
      useFactory: async (
        config: ConfigService,
      ): Promise<DatabaseConnection> => {
        const dbConfig = config.get<TDatabaseConfig>('database', {
          uri: 'mongodb://127.0.0.1',
          dbName: 'test',
        });

        const client = await MongoClient.connect(dbConfig.uri);

        return new DatabaseConnection(client, dbConfig);
      },
      inject: [ConfigService],
    },
  ],
  exports: [IDatabaseConnection],
})
export class DatabaseModule {}
