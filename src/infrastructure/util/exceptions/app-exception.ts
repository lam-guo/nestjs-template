import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  public errCode: number;

  constructor(err: number, msg: string) {
    super(msg, HttpStatus.OK);
    this.errCode = err;
  }
}
