import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, Body } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from '../../util/exceptions/app-exception';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  public logger = new Logger(HttpExceptionFilter.name);

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request = ctx.getRequest();
    if (request) {
      const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      let error: object;
      if (exception instanceof AppException) {
        error = {
          seqno: request?.body?.seqno || '',
          cmd: request?.body?.cmd || '',
          verifycode: request?.body?.verifycode || '',
          version: request?.body?.version || { ver: '', charset: '' },
          status: (exception as AppException).errCode,
          msg: (exception as AppException).message,
          data: {},
        };
      } else {
        error = {
          path: request.url,
          method: request.method,
          error: exception.message,
          ip: request.ip,
          timestamp: Date.now(),
        };
      }
      this.logger.error(error);
      response
        .status(status)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(error);
    } else {
      // const gqlHost = GqlArgumentsHost.create(host);
      // const gqlInfo = gqlHost.getInfo<GraphQLResolveInfo>();
      return exception;
    }
  }
}
