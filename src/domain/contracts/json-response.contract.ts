export interface IJsonResponse<T> {
  statusCode: number | string;
  message: string;
  data: T | null;
  error: any[] | null;
}
