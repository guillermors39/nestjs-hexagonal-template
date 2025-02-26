import { TErrors } from '../contracts/validator.interface';

export class ValidationException extends Error {
  constructor(
    public readonly errors: TErrors,
    message: string,
  ) {
    super(message);
  }
}
