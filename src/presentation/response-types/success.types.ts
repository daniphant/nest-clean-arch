import { HttpStatus } from '@nestjs/common';
import { IJsonResponse } from 'domain/contracts/json-response.contract';
import messages from 'shared/messages';

export const Ok = (
  data: any,
  message?: string,
): IJsonResponse<typeof data> => ({
  statusCode: HttpStatus.OK,
  message: message || messages.OK,
  data,
  error: null,
});

export const Created = (
  data: any,
  message?: string,
): IJsonResponse<typeof data> => ({
  statusCode: HttpStatus.CREATED,
  message: message || messages.CREATED,
  data,
  error: null,
});
