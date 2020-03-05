import { ArgumentMetadata, BadRequestException, Paramtype, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { AppException } from '../../util/exceptions/app-exception';
import { ErrorCode } from '../../constant/error';

@Injectable()
export class GlobalBodyDataPipe implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (type === 'body') {
      if (!value.data) {
        throw new AppException(ErrorCode.ParamError, '请求数据格式错误');
      } else {
        return value.data;
      }
    } else {
      return value;
    }
  }
}
