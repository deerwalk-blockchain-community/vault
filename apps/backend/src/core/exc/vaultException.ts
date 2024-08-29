export class VaultException extends Error {
  statusCode: number;
  causedBy?: string[];

  constructor(statusCode: number, message: string, causedBy?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.causedBy = causedBy;

    Object.setPrototypeOf(this, VaultException.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}
