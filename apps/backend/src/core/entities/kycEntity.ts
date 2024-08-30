enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export class KYCData {
  public firstName: string;
  public lastName: string;
  public nidNumber: string;
  public nidImageFront: string;
  public profileImage: string;
  public nidImageBack: string;
  public gender?: Gender;
  public userId: string;
  public sentToChain: boolean;
}
