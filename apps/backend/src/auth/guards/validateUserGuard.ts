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
export class ValidateUserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = await this.extractTokenFromHeader(request);
    if (!accessToken) {
      throw new BadRequestException();
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
      request['user'] = user;
      return true;
    } catch {
      throw new BadRequestException();
    }
  }
  private async extractTokenFromHeader(
    request: Request,
  ): Promise<string | undefined> {
    const { authorization }: any = request.headers;
    return authorization;
  }
}
