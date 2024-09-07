import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class DefaultQueryParams {
  @ApiProperty({
    required: true,
    description: 'Limit',
  })
  // @IsNumber()
  // @IsNotEmpty()
  limit: number;

  @ApiProperty({
    required: true,
    description: 'Page',
  })
  @IsNumber()
  // @IsNotEmpty()
  page: number;

  @ApiProperty({
    required: true,
    description: 'Is Descending?',
  })
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  descending: boolean;
}
