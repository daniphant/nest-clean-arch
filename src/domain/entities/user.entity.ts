export class UserEntity {
  id: string;
  internal_code: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  user_image_base64: string;
  token: string;
  application_name: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.internal_code = user.internal_code;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.full_name = user.full_name;
    this.user_image_base64 = user.user_image_base64;
    this.token = user.token;
  }
}
