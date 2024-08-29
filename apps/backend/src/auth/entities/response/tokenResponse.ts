import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class TokenResponse {
  access_token: string;
}
