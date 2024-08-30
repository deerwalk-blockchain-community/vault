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
// import { FileFieldsInterceptor,} from '@nestjs/platform-express';
import { FormDataRequest } from "nestjs-form-data"

@Controller('kyc')
@ApiTags('KYC')
export class KycController {
  @Version('1')
  @Post('')
  @UseGuards(ValidateUserGuard)
  @FormDataRequest()
  async postKyc(
    @Body() request: CreateKycRequest,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    console.log(request);
  }
}
