import { Injectable, Inject } from '@nestjs/common';
import { REPOSITORY_OPTIONS } from '../../constant/constant';
import { TypeOrmModule } from '@nestjs/typeorm';

@Injectable()
export class RepositoryService {
  constructor(@Inject(REPOSITORY_OPTIONS) private options) {}
}
