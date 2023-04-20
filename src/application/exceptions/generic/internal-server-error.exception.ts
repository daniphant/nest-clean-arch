import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'application/exceptions/base.exception';

enum DescriptionType {
  DATA_FETCHING_ERROR = 'DATA_FETCHING_ERROR',
  GENERIC = 'GENERIC',
}

export class InternalServerErrorException extends BaseException {
  constructor(
    descriptionType: keyof typeof DescriptionType,
    descriptionArgs?: unknown[],
  ) {
    const parsedDescription = (() => {
      switch (descriptionType) {
        case DescriptionType.DATA_FETCHING_ERROR:
          return `Erro ao buscar dados. Erro: ${descriptionArgs[0]}`;
        case DescriptionType.GENERIC:
          return `Erro interno do servidor.`;
      }
    })();

    super(
      'InternalServerErrorException',
      HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      parsedDescription,
    );
  }
}
