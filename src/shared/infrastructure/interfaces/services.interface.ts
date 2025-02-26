import { Db, MongoClient } from 'mongodb';

export interface IMapper<
  SingleInput,
  SingleOuput,
  CollectionInput = SingleInput,
  CollectionOutput = SingleOuput,
> {
  map(input: SingleInput): SingleOuput;
  map(input: CollectionInput[]): CollectionOutput[];
  map(input: SingleInput | CollectionInput[]): SingleOuput | CollectionOutput[];
}

export interface IDatabaseConnection {
  connection(): MongoClient;
  backmuchosol(): Db;
}

export const IDatabaseConnection = Symbol('IDatabaseConnection');
