import { EUserStatus } from 'src/users/domain/contracts/user.enum';

export class UserDocument {
  name: string;
  phone?: string;
  email: string;
  status: EUserStatus;
}
