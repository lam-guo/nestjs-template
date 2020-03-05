import { Controller, Get, Post, Body, Query, UseInterceptors, UsePipes, Put } from '@nestjs/common';
import { ArticleService } from '../../domain/article/service/article.service';
import { Article } from '../../domain/article/entity/article.entity';
import { Crud } from '@nestjsx/crud';

@Crud({
  model: {
    type: Article,
  },
})
@Controller('article')
export class ArticleController {
  /**
   *
   * @param {ArticleService} service
   */
  constructor(protected readonly service: ArticleService) { }
}
