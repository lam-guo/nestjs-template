import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { AnySchema } from '@hapi/joi';
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: AnySchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
