enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export class CreateKycRequest {
  firstName: String;
  lastName: String;
  nidNumber: String;
  gender: Gender;
  userId: String;
}
