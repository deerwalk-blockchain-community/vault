import { VaultException } from './vaultException';

export class ForbiddenException extends VaultException {
  constructor(message: string, causedBy: string[]) {
    super(403, message, causedBy);
  }
}

export class UnAuthorizedException extends VaultException {
  constructor(message: string, causedBy: string[]) {
    super(401, message, causedBy);
  }
}

export class ConflictException extends VaultException {
  constructor(message: string, causedBy: string[]) {
    super(409, message, causedBy);
  }
}

export class NotFoundException extends VaultException {
  constructor(message: string, causedBy: string[]) {
    super(404, message, causedBy);
  }
}

export class BadRequestException extends VaultException {
  constructor(message: string, causedBy: string[]) {
    super(400, message, causedBy);
  }
}
