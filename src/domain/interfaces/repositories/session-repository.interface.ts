export interface ISessionRepository {
  create(data: any): Promise<any>;
  getUserSessionByToken(token: string): Promise<any>;
  getUserSessions(userId: string): Promise<any>;
}
