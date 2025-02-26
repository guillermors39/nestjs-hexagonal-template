import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TCreateUserDto } from 'src/users/domain/contracts/user.type';

export class CreateUserRequest implements TCreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
