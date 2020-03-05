import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        return {
          seqno: request?.body?.seqno || '',
          cmd: request?.body?.cmd || '',
          status: 0,
          verifycode: request?.body?.verifycode || '',
          version: request?.body?.version || { ver: '', charset: '' },
          msg: '',
          data: value,
        };
      })
    );
  }
}
