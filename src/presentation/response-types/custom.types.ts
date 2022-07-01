import { IJsonResponse } from 'domain/contracts/json-response.contract';

export class CustomResponse implements IJsonResponse<any> {
  statusCode: number | string;
  message: string;
  data: any | null;
  error: any[] | null;

  constructor(
    statusCode: number | string,
    message: string,
    data: any,
    error: any[] | null,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
