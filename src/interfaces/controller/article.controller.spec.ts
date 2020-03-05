import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleModule } from './article.module';
import { ArticleServiceModule } from '../../domain/article/service/atricle.service.module';
import { RepositoryModule, RepositoryType } from '../../infrastructure/common/repository/repository.module';
import { ConfigModule } from '../../infrastructure/config/config.module';
import { HttpClientModule } from '../../infrastructure/common/httpclient/httpclientModule';
import { DetailAtrributeDto } from '../dto/article.dto';

describe('Article Controller', () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.config({ folder: '../' }),
        RepositoryModule.config({ type: RepositoryType.TYPEORM }),
        HttpClientModule.config(),
        ArticleServiceModule,
        ArticleModule,
      ],
      controllers: [ArticleController],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    const dto = { id: 'erwrwrw' };
    expect(controller.detail(dto)).toBeDefined();
  });
});
