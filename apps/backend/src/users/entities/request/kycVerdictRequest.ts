enum Verdict {
  ACCEPTED,
  REJECTED,
}

export class KYCVerdictRequest {
  verdict: Verdict;
  reason?: string;
}
