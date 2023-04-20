import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'application/exceptions/base.exception';

enum DescriptionTypes {
  INVALID_TOKEN = 'INVALID_TOKEN',
  MISSING_TOKEN = 'MISSING_TOKEN',
  MALFORMED_TOKEN = 'MALFORMED_TOKEN',
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  MISSING_CREDENTIALS = 'MISSING_CREDENTIALS',
  GENERIC = 'GENERIC',
  EXPIRED_SESSION = 'EXPIRED_SESSION',
}

export class UnauthorizedException extends BaseException {
  constructor(
    descriptionType: keyof typeof DescriptionTypes,
    descriptionArgs?: unknown[],
  ) {
    const parsedDescription = (() => {
      switch (descriptionType) {
        case DescriptionTypes.INVALID_TOKEN:
          return `Token inválido.`;
        case DescriptionTypes.MISSING_TOKEN:
          return `Token não informado.`;
        case DescriptionTypes.MALFORMED_TOKEN:
          return `Token malformado.`;
        case DescriptionTypes.EXPIRED_TOKEN:
          return `Token expirado.`;
        case DescriptionTypes.INVALID_CREDENTIALS:
          return `Credenciais inválidas.`;
        case DescriptionTypes.MISSING_CREDENTIALS:
          return `Credenciais não informadas.`;
        case DescriptionTypes.GENERIC:
          return `Erro ao autenticar.`;
        case DescriptionTypes.EXPIRED_SESSION:
          return `Sessão expirada.`;
      }
    })();

    super(
      'UnauthorizedException',
      HttpStatus.UNAUTHORIZED,
      true,
      parsedDescription,
    );
  }
}
