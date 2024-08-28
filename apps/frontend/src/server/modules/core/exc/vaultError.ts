class VaultError extends Error {
  statusCode: number;
  field?: string;
  constructor(statusCode: number, message?: string, field?: string) {
    super(message); // 'Error' breaks prototype chain here
    this.name = 'VaultError';
    this.statusCode = statusCode;
    this.field = field;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export default VaultError;
