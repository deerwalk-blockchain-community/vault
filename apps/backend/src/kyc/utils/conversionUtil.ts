import { Gender, KYCStatus } from '@prisma/client';

async function genderFromString(gender: string): Promise<Gender> {
  switch (gender) {
    case 'MALE':
      return Gender.MALE;
    case 'FEMALE':
      return Gender.Female;
    default:
      return Gender.OTHER;
  }
}

async function kycStatusFromString(status: string): Promise<KYCStatus> {
  switch (status) {
    case 'ACCEPTED':
      return KYCStatus.ACCEPTED;
    case 'REJECTED':
      return KYCStatus.REJECTED;
    default:
      return KYCStatus.APPLIED;
  }
}

export { kycStatusFromString, genderFromString };
