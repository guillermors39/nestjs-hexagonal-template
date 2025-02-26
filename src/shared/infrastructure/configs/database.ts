export enum DbCollection {
  users = 'template-users',
}

export type TDatabaseConfig = ReturnType<typeof config>['database'];

const config = () => ({
  database: {
    uri: `${process.env.MONGODB_URI}`,
    dbName: process.env.MONGODB_DB_NAME || 'backmuchosol',
  },
});

export default config;
