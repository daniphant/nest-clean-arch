import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { InternalServerErrorException } from 'application/exceptions/internal-server-error.exception';
import { CustomResponse } from '../response-types/custom.types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    console.error(exception);

    const error = this.errorSerializer(exception);

    const responseBody = new CustomResponse(
      error.statusCode,
      error.message,
      null,
      error,
    );

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      (error as any).statusCode || (error as any).status,
    );
  }

  private errorSerializer(exception: any) {
    const topMostException = Array.isArray(exception)
      ? exception[0]
      : exception;

    if (topMostException?.isValidationError) {
      return {
        name: 'ValidationException',
        statusCode: HttpStatus.BAD_REQUEST,
        isOperational: true,
        message: 'Validation failed',
        description: exception.map((e: any) =>
          Object.entries(e.constraints)
            .map(([, value]) => value)
            .join(', '),
        ),
      };
    }

    if (
      topMostException?.isOperational ||
      process.env.NODE_ENV === 'development'
    ) {
      return topMostException;
    }

    return new InternalServerErrorException('Internal Server Error');
  }
}
