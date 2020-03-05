import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ReqFormatMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // TODO 此处做请求参数格式校验
    // if (['POST', 'PUT'].includes(req.method) && !req.body.cmd) throw Error(`缺少cmd`);
    next();
  }
}
