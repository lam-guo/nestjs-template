import { Module, ExceptionFilter } from '@nestjs/common';
import { ArticleServiceModule } from '../../domain/article/service/atricle.service.module';
import { ArticleController } from './article.controller';

@Module({
  imports: [ArticleServiceModule],
  providers: [],
  controllers: [ArticleController],
  exports: [ArticleServiceModule],
})
export class ArticleModule {}
