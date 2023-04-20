import { BaseException } from 'application/exceptions/base.exception';

enum DescriptionType {
  USER = 'USER',
  SKU = 'SKU',
  CAPTAIN = 'CAPTAIN',
  CLUSTER = 'CLUSTER',
  STATE = 'STATE',
  BUNDLE = 'BUNDLE',
  RANGE = 'RANGE',
  SCENERY_TYPE = 'SCENERY_TYPE',
}

export class NotFoundException extends BaseException {
  constructor(
    descriptionType: keyof typeof DescriptionType,
    descriptionArgs?: unknown[],
  ) {
    const parsedDescription = (() => {
      switch (descriptionType) {
        case DescriptionType.USER:
          return `Usuário não encontrado.`;
        case DescriptionType.SKU:
          return `SKU não encontrado.`;
        case DescriptionType.CAPTAIN:
          return `SKU Capitão não encontrado.`;
        case DescriptionType.CLUSTER:
          return `Cluster não encontrado.`;
        case DescriptionType.STATE:
          return `Estado não encontrado.`;
        case DescriptionType.BUNDLE:
          return `Bundle não encontrado.`;
        case DescriptionType.RANGE:
          return `Range não encontrado.`;
        case DescriptionType.SCENERY_TYPE:
          return `Cenário com este tipo não encontrado.`;
      }
    })();

    super('NotFoundException', 404, true, parsedDescription);
  }
}
