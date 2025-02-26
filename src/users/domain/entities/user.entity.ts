import { Properties } from '@shared/domain/types/app.type';
import { EUserStatus } from '../contracts/user.enum';
import { TCreateUserDto } from '../contracts/user.type';

export type TUserDto = Properties<UserEntity>;

export class UserEntity {
  public readonly id?: string;
  public readonly name: string;
  public readonly phone?: string;
  public readonly email: string;
  public readonly status: EUserStatus;

  private constructor(dto: TUserDto) {
    Object.assign(this, dto);
  }

  static fromDto(dto: TUserDto): UserEntity {
    return new UserEntity(dto);
  }

  static create(dto: TCreateUserDto): UserEntity {
    return new UserEntity({ ...dto, status: EUserStatus.ACTIVE });
  }
}
