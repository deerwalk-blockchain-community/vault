import { PrismaClient, type Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { UserWithoutPassword } from '../../core/domain/entities/user';
import { compareHash, generateHash } from '../utils/passwordUtil';
import VaultError from '../../core/exc/vaultError';
import { generateJWT } from '../utils/jwtUtil';

class AuthController {
  public static async registerUser(
    email: string,
    password: string,
    db: PrismaClient,
  ): Promise<Result<UserWithoutPassword, VaultError>> {
    const already = await db.users.findUnique({
      where: {
        email: email,
      },
    });
    if (already) {
      return Result.err(new VaultError(409, 'Already Exists', 'email'));
    }
    const newUser = await db.users.create({
      data: {
        email: email,
        password: await generateHash(password),
      },
    });
    return Result.ok(newUser satisfies UserWithoutPassword);
  }

  public static async loginUser(
    email: string,
    password: string,
    db: PrismaClient,
  ): Promise<Result<UserWithoutPassword, VaultError>> {
    const user = await db.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return Result.err(new VaultError(404, 'Does not Exist', 'email'));
    }
    if (!(await compareHash(password, user.password))) {
      return Result.err(
        new VaultError(401, 'Incorrect Credentials', 'password'),
      );
    }
    return Result.ok(user satisfies UserWithoutPassword);
  }

  public static async generateToken(userId: string) {
    return await generateJWT(userId);
  }
}

export default AuthController;
