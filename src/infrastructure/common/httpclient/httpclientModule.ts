import { ConfigModule } from '../../config/config.module';
import { Module, DynamicModule, Global, Logger, HttpModule } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { HttpServices } from './http-service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpServices],
  exports: [HttpServices],
})
export class HttpClientModule {
  static config(): DynamicModule {
    return HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    });
  }
}
