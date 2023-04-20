import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'application/exceptions/base.exception';

enum DescriptionType {
  CLUSTER = 'CLUSTER',
  BUNDLE = 'BUNDLE',
}

export class AlreadyExistsException extends BaseException {
  constructor(
    descriptionType: keyof typeof DescriptionType,
    descriptionArgs?: unknown[],
  ) {
    const parsedDescription = (() => {
      switch (descriptionType) {
        case DescriptionType.CLUSTER:
          return `Já existe um cluster para a fábrica ${descriptionArgs[0]} e de nome ${descriptionArgs[1]}.`;
        case DescriptionType.BUNDLE:
          return `Bundle já pertence ao cluster: ${descriptionArgs[0]}.`;
      }
    })();

    super(
      'AlreadyExistsException',
      HttpStatus.BAD_REQUEST,
      true,
      parsedDescription,
    );
  }
}
