import { Injectable } from '@nestjs/common';
import { KYCStatus } from '@prisma/client';
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
      take: Math.round(limit),
      orderBy: {
        updatedAt: descending ? 'desc' : 'asc',
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

  async setUserStatus(userId: string, status: KYCStatus) {
    const updated = await prisma.kYCData.update({
      where: {
        userId: userId,
      },
      data: {
        status: status,
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

  async getRejectionsWithPagination(options: {
    page: number;
    limit: number;
    descending: boolean;
    userId: string;
  }) {
    const offset = (options.page - 1) * options.limit;
    const rejections = await prisma.rejections.findMany({
      take: Math.round(options.limit),
      skip: offset,
      where: {
        kyc: {
          userId: options.userId,
        },
      },
      orderBy: {
        updatedAt: options.descending ? 'desc' : 'asc',
      },
      select: {
        createdAt: true,
        updatedAt: true,
        kyc: true,
        reason: true,
        id: true,
      },
    });
    console.log('The rejections are : ', rejections);
    return rejections;
  }
  async postToChain(data : {first_name : string, last_name : string, nidNumber : string }){
    const response = await fetch("http://127.0.0.1:3000/api/person", {
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data),
      method:'POST'
    });
    console.log(response);
  }
}
