import { ApiResponse } from '@shared/infrastructure/responses/base.response';
import { UserEntity } from 'src/users/domain/entities/user.entity';

export class UserResponse extends ApiResponse<UserEntity> {
  response() {
    return {
      id: this.data.id,
      name: this.data.name,
      email: this.data.email,
      status: this.data.status,
      phone: this.data.phone,
    };
  }
}
