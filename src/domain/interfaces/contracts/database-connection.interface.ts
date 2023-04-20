export interface IDatabaseConnection {
  type: string;
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  company_id?: string;
}
