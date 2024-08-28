import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../core/config';
import { UserWithoutPassword } from '../../core/domain/entities/user';
import VaultError from '../../core/exc/vaultError';
import { Result } from '@badrap/result';
import { PrismaClient } from '@prisma/client';

type TokenData = {
  userId: string;
};

async function generateJWT(userId: string): Promise<string> {
  return jwt.sign(userId, SECRET_KEY, {
    expiresIn: '1w',
  });
}

async function validateToken() {}

async function decodeAndVerifyJwtToken(
  token: string,
  db: PrismaClient,
): Promise<Result<UserWithoutPassword, VaultError>> {
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    const userId = verified as string;
    try {
      const user = await db.users.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });
      return Result.ok(user as UserWithoutPassword);
    } catch (e) {
      return Result.err(
        new VaultError(404, 'Could not Find Your User!', 'token'),
      );
    }
  } catch (e: any) {
    return Result.err(new VaultError(403, e.name, 'token'));
  }
}

export { generateJWT, decodeAndVerifyJwtToken };
