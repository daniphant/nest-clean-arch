import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'application/exceptions/base.exception';

enum DescriptionType {
  CITIES = 'CITIES',
  SKU = 'SKU',
  UPLOAD_STATUS = 'UPLOAD_STATUS',
  DEFAULT_PARAMETER_LEVEL = 'DEFAULT_PARAMETER_LEVEL',
  NOT_UNIQUE_CLIENT = 'NOT_UNIQUE_CLIENT',
  INVALID_UF = 'INVALID_UF',
}

export class BadRequestException extends BaseException {
  constructor(
    descriptionType: keyof typeof DescriptionType,
    descriptionArgs?: unknown[],
  ) {
    const parsedDescription = (() => {
      switch (descriptionType) {
        case DescriptionType.CITIES:
          return `Por favor, informe um estado.`;
        case DescriptionType.SKU:
          return `Esse SKU já está vinculado ao SKU ${descriptionArgs[0]}.`;
        case DescriptionType.UPLOAD_STATUS:
          return `Ocorreu um erro ao processar o arquivo. Verifique o banco de dados para mais detalhes.`;
        case DescriptionType.DEFAULT_PARAMETER_LEVEL:
          return `O nível ${descriptionArgs[0]} não existe.`;
        case DescriptionType.NOT_UNIQUE_CLIENT:
          return `A combinação '${descriptionArgs[0]}' já está associada ao cluster '${descriptionArgs[1]}'.`;
        case DescriptionType.INVALID_UF:
          return `O campo UF deve conter duas letras maiúsculas referentes a sigla de seu estado.`;
      }
    })();

    super(
      'BadRequestException',
      HttpStatus.BAD_REQUEST,
      true,
      parsedDescription,
    );
  }
}
