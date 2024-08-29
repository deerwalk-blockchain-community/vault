import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { tokenSecretKey } from '../config';
import { prisma } from 'src/core/db/prisma';
import { UserWithOutPassword } from 'src/core/entities/userEntity';

type ExtendedRequest = Request & { user: UserWithOutPassword };

@Injectable()
export class GetCurrentAdminUser implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    console.log('Request...');
    const accessToken = await this.extractTokenFromHeader(req);

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
      });

      if (!user) {
        return new UnauthorizedException();
      }
      if(!user.isAdmin){
        return new UnauthorizedException();
      }
      req['user'] = user;
      next();
    } catch {
      throw new BadRequestException();
    }
  }

  private async extractTokenFromHeader(
    request: Request,
  ): Promise<string | undefined> {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
