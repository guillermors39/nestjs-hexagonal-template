import { IDatabaseConnection } from '@shared/infrastructure/interfaces/services.interface';
import { DatabaseConnection } from '@shared/infrastructure/services/database-connection.service';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { MongoClient } from 'mongodb';

let startedContainer: StartedMongoDBContainer;
let connection: IDatabaseConnection;

beforeAll(async () => {
  const container = new MongoDBContainer('mongo:7');
  startedContainer = await container.withExposedPorts(27017).start();

  const uri = startedContainer.getConnectionString();
  const dbName = 'test';

  const client = await MongoClient.connect(uri, { directConnection: true });

  connection = new DatabaseConnection(client, { uri, dbName });

  process.env.MONGODB_URI = uri;
  process.env.MONGODB_DB_NAME = dbName;

  global.__TESTCONTAINERS__ = { startedContainer, connection };
}, 25000);

afterAll(async () => {
  await connection.connection().close();
  await startedContainer.stop();
});

export { connection };
