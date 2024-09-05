import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { tokenSecretKey } from '../config';
import { prisma } from 'src/core/db/prisma';

@Injectable()
export class ValidateAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestToken = await this.extractTokenFromHeader(request);
    const accessToken = requestToken?.split(' ')[1];
    if (!accessToken) {
      throw new BadRequestException({ message: 'No Access Token!' });
    }
    try {
      const object = await this.jwtService.verifyAsync(accessToken, {
        secret: tokenSecretKey,
      });
      const user = await prisma.users.findUnique({
        where: {
          id: object.userId,
        },
        select: {
          id: true,
          email: true,
          isAdmin: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }
      if (!user.isAdmin) {
        throw new UnauthorizedException();
      }
      request['user'] = user;
      return true;
    } catch (e) {
      throw e;
    }
  }
  private async extractTokenFromHeader(
    request: Request,
  ): Promise<string | undefined> {
    const { authorization }: any = request.headers;
    return authorization;
  }
}
