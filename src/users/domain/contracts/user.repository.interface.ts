import { UserEntity } from '../entities/user.entity';

export interface ICreateUserRepository {
  create(entity: UserEntity): Promise<UserEntity>;
}

export interface IFindByEmailUserRepository {
  findByEmail(email: string): Promise<UserEntity | undefined>;
}

export const ICreateUserRepository = Symbol('ICreateUserRepository');
export const IFindByEmailUserRepository = Symbol('IFindByEmailUserRepository');

export type IUserRepository = ICreateUserRepository &
  IFindByEmailUserRepository;
