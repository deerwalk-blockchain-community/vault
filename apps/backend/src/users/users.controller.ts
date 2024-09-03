import { Controller, UseGuards, Get, Version, Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateAdminGuard } from 'src/auth/guards/validateAdminGuard';
import { DefaultQueryParams } from 'src/core/entities/queryParamEntity';
import { UsersService } from './users.service';

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor( private readonly userService : UsersService){}
    @Version('1')
    @Get('')
    @UseGuards(ValidateAdminGuard)
    getMany(@Query() queryParams : DefaultQueryParams){
        console.log(queryParams)
    }


}
