import { Module, HttpModule } from '@nestjs/common';
import { ArticleService } from './article.service';
import { RepositoryModule } from '../../../infrastructure/common/repository/repository.module';
import { ArticleRepository } from '../repository/article.repository';
import { HttpServices } from '../../../infrastructure/common/httpclient/http-service';

@Module({
  imports: [RepositoryModule.getRepository([ArticleRepository]), HttpModule],
  providers: [ArticleService, HttpServices],
  controllers: [],
  exports: [ArticleService, HttpServices],
})
export class ArticleServiceModule {}
