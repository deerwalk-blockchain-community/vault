import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { tokenSecretKey } from '../config';
import { prisma } from 'src/core/db/prisma';

@Injectable()
export class GetCurrentUser implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
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
        select: {
          id: true,
          email: true,
          isAdmin: true,
        },
      });
      if (!user) {
        return new UnauthorizedException();
      }
      res.locals.user = user;
      // req.user = user
      next();
    } catch {
      throw new BadRequestException();
    }
    throw new InternalServerErrorException();
  }

  private async extractTokenFromHeader(
    request: Request,
  ): Promise<string | undefined> {
    return request.headers.authorization;
  }
}
