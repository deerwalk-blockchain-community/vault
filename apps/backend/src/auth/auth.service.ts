import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserWithOutPassword } from 'src/core/entities/userEntity';
import { VaultException } from 'src/core/exc/vaultException';
import { Err, Ok, Result } from 'ts-results';
import { compareHash, generateHash } from './utils/passwordUtil';

@Injectable()
export class AuthService {
  async registerUser(
    email: string,
    password: string,
    db: PrismaClient,
  ): Promise<Result<UserWithOutPassword, VaultException>> {
    const already = await db.users.findUnique({
      where: {
        email: email,
      },
    });
    if (already) {
      return Err(
        new VaultException(409, 'User Already Exists', ['email', 'password']),
      );
    }

    const created = await db.users.create({
      data: {
        email: email,
        password: await generateHash(password),
      },
    });
    return Ok(created as UserWithOutPassword);
  }

  async loginUser(
    email: string,
    password: string,
    db: PrismaClient,
  ): Promise<Result<UserWithOutPassword, VaultException>> {
    const exists = await db.users.findUnique({
      where: { email: email },
    });
    if (!exists) {
      return Err(
        new VaultException(404, 'User Does not Exist', ['email', 'password']),
      );
    }
    if (!(await compareHash(password, exists.password))) {
      return Err(
        new VaultException(403, 'Incorrect Credentials!', ['password']),
      );
    }

    return Ok(exists as UserWithOutPassword);
  }
}
