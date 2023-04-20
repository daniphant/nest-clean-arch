import { HttpCodes } from 'application/utils/http-codes.util';
import { ResponseCodes } from 'application/utils/response-codes.util';
import { JsonResponse } from './json-response.dto';

export const OkResponse = (
  data: any,
  message?: string,
): JsonResponse<any, any> => ({
  statusCode: HttpCodes.OK,
  message: message || ResponseCodes.C200,
  data,
  error: null,
});
