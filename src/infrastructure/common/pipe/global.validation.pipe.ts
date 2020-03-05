import { ValidationPipe } from '@nestjs/common';
import { AppException } from '../../util/exceptions/app-exception';
import { ErrorCode } from '../../constant/error';
import { ValidationError } from 'class-validator';

export const validationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: errors => checkError(errors),
});

function checkError(errors: ValidationError[]) {
  errors.forEach(error => {
    const constraints = error.constraints;
    const children = error.children;
    Object.keys(constraints).forEach(key => {
      throw new AppException(ErrorCode.ParamError, constraints[key]);
    });
    if (children.length) {
      checkError(children);
    }
  });
  throw new AppException(ErrorCode.UnknowError, '服务器繁忙');
}
