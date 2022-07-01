import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class InternalServerErrorException extends BaseException {
  constructor(description: string) {
    super(
      'InternalServerErrorException',
      HttpStatus.INTERNAL_SERVER_ERROR,
      true,
      description,
    );
  }
}
