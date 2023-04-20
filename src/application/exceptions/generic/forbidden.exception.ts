import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'application/exceptions/base.exception';

enum DescriptionTypes {
  GENERIC = 'GENERIC',
}

export class ForbiddenException extends BaseException {
  constructor(
    descriptionType: keyof typeof DescriptionTypes,
    descriptionArgs?: unknown[],
  ) {
    const parsedDescription = (() => {
      switch (descriptionType) {
        case DescriptionTypes.GENERIC:
          return `Acesso negado.`;
      }
    })();

    super(
      'UnauthorizedException',
      HttpStatus.FORBIDDEN,
      true,
      parsedDescription,
    );
  }
}
