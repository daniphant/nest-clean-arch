import { HttpStatus } from '@nestjs/common';
import { IJsonResponse } from 'domain/contracts/json-response.contract';
import messages from 'shared/messages';

export const BadRequest = (
  error: any[],
  message?: string,
): IJsonResponse<null> => ({
  statusCode: HttpStatus.BAD_REQUEST,
  message: message || messages.BAD_REQUEST,
  data: null,
  error,
});

export const NotFound = (
  error: any[],
  message?: string,
): IJsonResponse<null> => ({
  statusCode: HttpStatus.NOT_FOUND,
  message: message || messages.NOT_FOUND,
  data: null,
  error,
});
