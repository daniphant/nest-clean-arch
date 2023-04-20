import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from 'application/exceptions/generic/unauthorized.exception';
import { Inject } from '@nestjs/common/decorators';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ISessionRepository } from 'domain/interfaces/repositories/session-repository.interface';
import { IAuthProvider } from 'domain/interfaces/providers/auth-provider.interface';
import { UserEntity } from 'domain/entities/user.entity';
import { UserCompanyAggregate } from 'domain/aggregates/user-company.aggregate';
import { CompanyEntity } from 'domain/entities/company.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly _sessionRepository: ISessionRepository;
  private reflector: Reflector;
  private authProvider: IAuthProvider;

  constructor(
    @Inject('Reflector')
    reflector: Reflector,
    @Inject('ISessionRepository')
    sessionRepository: ISessionRepository,
    @Inject('IAuthProvider')
    authProvider: IAuthProvider,
  ) {
    this.reflector = reflector;
    this._sessionRepository = sessionRepository;
    this.authProvider = authProvider;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) throw new UnauthorizedException('MISSING_TOKEN');

    const parts = tokenHeader.split(' ');

    if (parts.length !== 2) throw new UnauthorizedException('INVALID_TOKEN');

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      throw new UnauthorizedException('MALFORMED_TOKEN');

    const session = await this._sessionRepository.getUserSessionByToken(token);

    if (!session) throw new UnauthorizedException('INVALID_TOKEN');

    if (session.expiration < new Date())
      throw new UnauthorizedException('EXPIRED_TOKEN');

    const authValidationResponse = await this.authProvider.validateToken(token);

    req.user = new UserCompanyAggregate(
      new UserEntity({
        id: authValidationResponse.user.id,
        application_name: authValidationResponse.user.application_name[0],
        email: authValidationResponse.user.email,
        first_name: authValidationResponse.user.first_name,
        full_name: authValidationResponse.user.full_name,
        internal_code: authValidationResponse.user.internal_code,
        last_name: authValidationResponse.user.last_name,
        token: authValidationResponse.token,
        user_image_base64: authValidationResponse.user.user_image_base64,
      }),
      new CompanyEntity({
        ...authValidationResponse.user.company,
      }),
    );

    return true;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('INVALID_TOKEN');
    }

    return user;
  }
}
