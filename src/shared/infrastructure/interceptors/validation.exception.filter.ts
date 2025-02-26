import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { TErrors } from '@shared/domain/contracts/validator.interface';
import { ValidationException } from '@shared/domain/exceptions/validation.exception';
import { Response } from 'express';

@Catch(ValidationException)
export class ValidationExceptionFilter
  implements ExceptionFilter<ValidationException>
{
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.UNPROCESSABLE_ENTITY;

    const getMessage = (errors: TErrors): string[] => {
      if (typeof errors === 'string') return [errors];

      if (Array.isArray(errors)) return errors;

      return Object.entries(errors).flatMap(([key, errors]) => {
        const mapped = getMessage(errors);

        return mapped.map((item) => `${key}: ${item}`);
      });
    };

    response.status(statusCode).json({
      statusCode,
      error: exception.message,
      message: getMessage(exception.errors),
    });
  }
}
