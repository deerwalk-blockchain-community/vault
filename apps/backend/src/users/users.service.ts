import { Injectable } from '@nestjs/common';
import { prisma } from 'src/core/db/prisma';

@Injectable()
export class UsersService {
  async getUsersWithPagination(
    page: number,
    limit: number,
    descending: boolean,
  ) {
    const offset = (page - 1) * limit;

    const users = await prisma.users.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        id: descending ? 'desc' : 'asc',
      },
      select: {
        email: true,
        password: false,
        isAdmin: false,
        id: true,
        kyc: true,
      },
    });

    return users;
  }

  async getUserById(userId: string) {
    return await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        password: false,
        isAdmin: false,
        id: true,
        kyc: true,
      },
    });
  }
}
