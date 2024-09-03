import {
  Controller,
  UseGuards,
  Get,
  Version,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateAdminGuard } from 'src/auth/guards/validateAdminGuard';
import { DefaultQueryParams } from 'src/core/entities/queryParamEntity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
    return await this.userService.getUserById(userId)
  }
}
