import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'application/exceptions/base.exception';

enum DescriptionType {
  NOT_A_CAPTAIN = 'NOT_A_CAPTAIN',
  HAS_A_CAPTAIN = 'HAS_A_CAPTAIN',
}

export class NotACaptainException extends BaseException {
  constructor(
    descriptionType: keyof typeof DescriptionType,
    descriptionArgs?: unknown[],
  ) {
    const parsedDescription = (() => {
      switch (descriptionType) {
        case DescriptionType.NOT_A_CAPTAIN:
          return `Esse SKU não é um capitão.`;
        case DescriptionType.HAS_A_CAPTAIN:
          return `Esse SKU já possui vínculo ao SKU capitão ${descriptionArgs[0]}.`;
      }
    })();

    super(
      'NotACaptainException',
      HttpStatus.BAD_REQUEST,
      true,
      parsedDescription,
    );
  }
}
