import { HttpCodes } from 'application/utils/http-codes.util';
import { ResponseCodes } from 'application/utils/response-codes.util';
import { JsonResponse } from './json-response.dto';

export const BadRequestResponse = (
  data: any,
  message?: string,
): JsonResponse<any, any> => ({
  statusCode: HttpCodes.BAD_REQUEST,
  message: message || ResponseCodes.C400,
  data,
  error: null,
});
