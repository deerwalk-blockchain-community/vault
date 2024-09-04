import { ApiProperty } from "@nestjs/swagger";

enum Verdict {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export class KYCVerdictRequest {
    @ApiProperty({
        description:"Verdict of the KYC Application!",
        required:true
    })
  verdict: Verdict;
  @ApiProperty({
    description:"Reason for Rejection, if rejected!",
    nullable:true
  })
  reason?: string;
}
