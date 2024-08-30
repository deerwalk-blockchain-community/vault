import {
  Body,
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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('kyc')
@ApiTags('KYC')
export class KycController {
  @Version('1')
  @Post('')
  @UseGuards(ValidateUserGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profileImage', maxCount:1 },
      { name: 'nidFrontImage', maxCount : 1},
      { name: 'nidBackImage', maxCount:1 },
    ]),
  )
  async postKyc(
    @Body() request: CreateKycRequest,
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File
      nidFrontImage?: Express.Multer.File
      nidBackImage?: Express.Multer.File
    },
  ) {
    console.log(request);
    console.log(files);
  }
}
