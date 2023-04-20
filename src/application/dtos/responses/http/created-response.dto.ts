import { HttpCodes } from 'application/utils/http-codes.util';
import { ResponseCodes } from 'application/utils/response-codes.util';
import { JsonResponse } from './json-response.dto';

export const CreatedResponse = (
  data: any,
  message?: string,
): JsonResponse<any, any> => ({
  statusCode: HttpCodes.CREATED,
  message: message || ResponseCodes.C201,
  data,
  error: null,
});
