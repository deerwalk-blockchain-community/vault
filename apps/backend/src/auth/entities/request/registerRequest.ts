import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
