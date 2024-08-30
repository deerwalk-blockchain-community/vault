import { ApiProperty } from '@nestjs/swagger';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class CreateKycRequest {
  @ApiProperty({
    required: true,
    description: 'First Name of Person',
  })
  firstName: String;
  @ApiProperty({
    required: true,
    description: 'Last Name of Person',
  })
  lastName: String;
  @ApiProperty({
    required: true,
    description: 'National ID Card Number',
  })
  nidNumber: String;
  @ApiProperty({
    required: true,
    description: 'Gender of Person',
  })
  gender: Gender;

  //   @ApiProperty()
  //   @IsFile()
  //   @HasMimeType('image/*')
  //   profileImage : FileSystemStoredFile

  //   @ApiProperty()
  //   @IsFile()
  //   @HasMimeType('image/*')
  //   nidImageFront : FileSystemStoredFile

  //   @ApiProperty()
  //   @IsFile()
  //   @HasMimeType('image/*')
  //   nidImageBack : FileSystemStoredFile
}
