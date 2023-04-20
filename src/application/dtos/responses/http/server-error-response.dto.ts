import { HttpCodes } from 'application/utils/http-codes.util';
import { ResponseCodes } from 'application/utils/response-codes.util';
import { JsonResponse } from './json-response.dto';

export const ErroResponse = (
  data: any,
  message?: string,
  error?: any,
): JsonResponse<any, any> => ({
  statusCode: HttpCodes.INTERNAL_SERVER_ERROR,
  message: message || ResponseCodes.C500,
  data,
  error: error || null,
});
