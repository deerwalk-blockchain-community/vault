import { KYCData } from './kycEntity';

export class UserWithOutPassword {
  public id: string;
  public email: string;
  public isAdmin: boolean;
}

export class UserWithPassword extends UserWithOutPassword {
  public password: string;
}

export class UserWithKYC extends UserWithOutPassword {
  public kyc: KYCData;
}
