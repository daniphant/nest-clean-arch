import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor(description: string) {
    super('UnauthorizedException', HttpStatus.FORBIDDEN, true, description);
  }
}
