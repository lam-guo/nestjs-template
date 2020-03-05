import { Injectable } from '@nestjs/common';
import { Article } from '../entity/article.entity';
import { BaseService } from '../../../infrastructure/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from '../repository/article.repository';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
  constructor(
    @InjectRepository(ArticleRepository) protected readonly repo: ArticleRepository
  ) {
    super(repo);
  }
}
