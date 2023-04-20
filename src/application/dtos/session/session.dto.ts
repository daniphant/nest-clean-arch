export class SessionDto {
  userId: string;
  token: string;
  expiresAt: Date;

  constructor(userId: string, token: string, expiresAt: Date) {
    this.userId = userId;
    this.token = token;
    this.expiresAt = expiresAt;
  }
}
