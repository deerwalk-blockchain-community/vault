enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export class KYCData {
  public firstName: String;
  public lastName: String;
  public nidNumber: String;
  public nidImageFront: String;
  public nidImageBack: String;
  public gender?: Gender;
  public userId: String;
  sentToChain: Boolean;
}
