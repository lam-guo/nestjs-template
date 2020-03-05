import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReqFormatMiddleware } from './infrastructure/common/middleware/reqFormat.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './infrastructure/common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from './infrastructure/common/interceptor/timeout.interceptor';
import { ResFormatInterceptor } from './infrastructure/common/interceptor/resFormat.interceptor';
import { ConfigModule } from './infrastructure/config/config.module';
import { RepositoryModule, RepositoryType } from './infrastructure/common/repository/repository.module';
import { ArticleModule } from './interfaces/controller/article.module';
import { HttpClientModule } from './infrastructure/common/httpclient/httpclientModule';

@Module({
  imports: [ConfigModule.config({ folder: '../config/' }), RepositoryModule.config({ type: RepositoryType.TYPEORM }), HttpClientModule.config(), ArticleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // 注册全局logging拦截器
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeoutInterceptor, // 注册全局超时拦截器
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResFormatInterceptor, // 注册全局返回体拦截器
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReqFormatMiddleware).forRoutes('article');
  }
}
