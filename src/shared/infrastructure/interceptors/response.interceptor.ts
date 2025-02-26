/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as ExpressResponse } from 'express';
import { ApiResponse } from '../responses/base.response';

export interface Response<T> {
  data: T;
}

const withOutData = ['/health'];

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<ExpressResponse>();

    const uri = request.url;

    return next.handle().pipe(
      map((data) => {
        if (withOutData.includes(uri)) return data;

        if (data === undefined) {
          response.statusCode = HttpStatus.NO_CONTENT;
          return;
        }

        if (data instanceof ApiResponse) {
          response.statusCode = data.status();

          return { data: data.response() };
        }

        return { data };
      }),
    );
  }
}
