import {
  Controller,
  UseGuards,
  Get,
  Version,
  Query,
  Param,
  Body,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateAdminGuard } from 'src/auth/guards/validateAdminGuard';
import { DefaultQueryParams } from 'src/core/entities/queryParamEntity';
import { UsersService } from './users.service';
import { KYCVerdictRequest } from './entities/request/kycVerdictRequest';
import { NotFoundException } from 'src/core/exc/defaultExceptions';
import { KYCStatus } from '@prisma/client';
import { ValidateUserGuard } from 'src/auth/guards/validateUserGuard';
import { User } from 'src/kyc/decorators/userDecorator';
import { UserWithOutPassword } from 'src/core/entities/userEntity';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Version('1')
  @Get('kyc')
  @UseGuards(ValidateUserGuard)
  async getSelf(@User() user: UserWithOutPassword) {
    return await this.userService.getUserById(user.id);
  }

  @Version('1')
  @Get('')
  @UseGuards(ValidateAdminGuard)
  async getMany(@Query() queryParams: DefaultQueryParams) {
    return await this.userService.getUsersWithPagination(
      queryParams.page,
      queryParams.limit,
      queryParams.descending,
    );
  }

  @Version('1')
  @Get(':userId')
  @UseGuards(ValidateAdminGuard)
  async getOne(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Version('1')
  @Post(':userId/kyc')
  @UseGuards(ValidateAdminGuard)
  async postVerdict(
    @Param('userId') userId: string,
    @Body() request: KYCVerdictRequest,
  ) {
    console.log(request);
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User was not Found', ['userId']);
    }

    switch (request.verdict.toString()) {
      case 'REJECTED':
        await this.userService.rejectKyc(user.kyc?.id!, request.reason!);
        return this.userService.setUserStatus(userId, KYCStatus.REJECTED);
      case 'ACCEPTED':
        return this.userService.setUserStatus(userId, KYCStatus.ACCEPTED);
      //
      default:
        throw new BadRequestException();
    }
  }

  @Version('1')
  @Get(':userId/rejections')
  @UseGuards(ValidateUserGuard)
  async getRejections(
    @Param('userId') userId: string,
    @User() user: UserWithOutPassword,
    @Query() queryParams: DefaultQueryParams,
  ) {
    return await this.userService.getRejectionsWithPagination({
      descending: queryParams.descending,
      limit: queryParams.limit,
      page: queryParams.page,
      userId: user.id,
    });
  }
}
