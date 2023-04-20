import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErroResponse } from 'application/dtos/responses/http/server-error-response.dto';
import { BaseException } from 'application/exceptions/base.exception';
import { InternalServerErrorException } from 'application/exceptions/generic/internal-server-error.exception';

type ErrorWithStatus = { status: string; [key: string]: unknown };
type ValidationErrorShape = {
  constraints: { [key: string]: string };
};
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (process.env.NODE_ENV !== 'test') console.error(exception);
    const error = this.errorSerializer(exception);

    const responseBody = ErroResponse(
      error.statusCode || (error as ErrorWithStatus)?.status,
      error.message,
      error as unknown,
    );

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      Number((error as BaseException).statusCode) ||
        Number((error as ErrorWithStatus).status),
    );
  }

  private errorSerializer(exception: unknown) {
    const topMostException = Array.isArray(exception)
      ? exception[0]
      : exception;

    if (topMostException instanceof NotFoundException) {
      const err = topMostException.getResponse();

      return {
        statusCode: 404,
        message: 'Not Found',
        description: (err as BaseException)?.message,
      };
    }

    if (topMostException?.isValidationError) {
      return {
        name: 'ValidationException',
        statusCode: HttpStatus.BAD_REQUEST,
        isOperational: true,
        message: 'Validation failed',
        description: (exception as Array<ValidationErrorShape>).map((e) =>
          Object.entries(e.constraints)
            .map(([, value]) => value)
            .join(', '),
        ),
      };
    }

    if (topMostException?.isOperational) return topMostException;

    if (
      process.env.NODE_ENV !== 'production' ||
      topMostException.statusCode < 500 ||
      topMostException.status < 500
    )
      return {
        name: 'InternalServerErrorException',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        isOperational: false,
        message: 'Internal Server Error',
        description: {
          name: topMostException.name,
          message: topMostException.message,
        },
      };

    return new InternalServerErrorException('GENERIC');
  }
}
