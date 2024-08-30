import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { ValidateUserGuard } from 'src/auth/guards/validateUserGuard';
import { CreateKycRequest } from './entities/request/createKycrequest';

@Controller('kyc')
export class KycController {
  @Version('1')
  @Post('')
  @UseGuards(ValidateUserGuard)
  async postKyc(@Body() request: CreateKycRequest) {
    
  }
}
