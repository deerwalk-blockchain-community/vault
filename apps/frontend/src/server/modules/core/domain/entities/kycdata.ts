enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

type KYCData = {
  userId: number;
  firstName: string;
  lastName: string;
  nidNumber: string;
  nidImageFront: string;
  nidImageBack: string;
  gender: Gender;
};

export { type KYCData };
