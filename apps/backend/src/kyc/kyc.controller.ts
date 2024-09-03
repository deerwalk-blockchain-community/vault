import {
  Body,
  ConflictException,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { ValidateUserGuard } from 'src/auth/guards/validateUserGuard';
import { CreateKycRequest } from './entities/request/createKycrequest';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { KycService } from './kyc.service';
import { prisma } from 'src/core/db/prisma';
import { UserWithOutPassword } from 'src/core/entities/userEntity';
import { User } from './decorators/userDecorator';
import { KYCStatus } from '@prisma/client';

@Controller('kyc')
@ApiTags('KYC')
export class KycController {
  constructor(private readonly kycService: KycService) {}
  @Version('1')
  @Post('')
  @UseGuards(ValidateUserGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profileImage', maxCount: 1 },
      { name: 'nidFrontImage', maxCount: 1 },
      { name: 'nidBackImage', maxCount: 1 },
    ]),
  )
  async postKyc(
    @User() user: UserWithOutPassword,
    @Body() request: CreateKycRequest,
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File[];
      nidFrontImage?: Express.Multer.File[];
      nidBackImage?: Express.Multer.File[];
    },
  ) {
    const alreadyKyc = await prisma.kYCData.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (alreadyKyc) {
      throw new ConflictException({
        message: "User KYC Already Exists! Can't Post Twice!",
      });
    }
    const savedFiles = await this.kycService.saveMultipleFiles(files);
    console.log(savedFiles);
    const created =  await this.kycService.createKYCEntry(
      request.firstName as string,
      request.lastName as string,
      request.gender,
      request.nidNumber as string,
      savedFiles.nidFrontImage,
      savedFiles.nidBackImage,
      savedFiles.profileImage,
      user.id,
      KYCStatus.APPLIED,
    );

    return created
  }
}
