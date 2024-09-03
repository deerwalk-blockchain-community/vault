import { Injectable } from '@nestjs/common';
import { prisma } from 'src/core/db/prisma';
import { kycStatusFromString } from 'src/kyc/utils/conversionUtil';

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

  async setUserStatus(userId: string, status: string) {
    const updated = await prisma.kYCData.update({
      where: {
        userId: userId,
      },
      data: {
        status: await kycStatusFromString(status),
      },
    });

    return updated;
  }

  async rejectKyc(kycId: number, reason: string) {
    return await prisma.rejections.create({
      data: {
        kycId: kycId,
        reason: reason,
      },
    });
  }
}
