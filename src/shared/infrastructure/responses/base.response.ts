/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';

export abstract class ApiResponse<Data = any> {
  constructor(protected readonly data: Data) {}

  status(): HttpStatus {
    return HttpStatus.OK;
  }

  abstract response(): Record<string, any>;
}

// export abstract class CollectionApiResponse<Data = any> extends ApiResponse<
//   Data[]
// > {
//   constructor(protected readonly data: Data[]) {
//     super(data);
//   }

//   protected abstract item(item: Data): Record<string, any>;

//   response() {
//     return this.data.map((item) => this.item(item));
//   }
// }
