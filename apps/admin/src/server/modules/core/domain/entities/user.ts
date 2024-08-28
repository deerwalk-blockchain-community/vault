import { KYCData } from './kycdata';

type UserWithoutPassword = {
  id: string;
  email: string;
  kyc?: KYCData;
  isAdmin: boolean;
};

type UserWithPassword = UserWithoutPassword & { password: string };

export type { UserWithoutPassword, UserWithPassword };
