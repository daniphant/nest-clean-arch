import { ISSODatabaseConnection } from '../contracts/sso-database-connection.interface';
import { ISsoSessionsEndpointResponse } from '../contracts/sso-sessions-endpoint-response.interface';

export interface IAuthProvider {
  login(email: string, password: string): Promise<ISsoSessionsEndpointResponse>;
  getCompanyConnection(id: string): Promise<ISSODatabaseConnection>;
  validateToken(token: string): Promise<ISsoSessionsEndpointResponse>;
}
