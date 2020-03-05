import { DynamicModule, Module, Global, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from '../constant/constant';

export interface ConfigModuleOptions {
  folder: string;
}

@Global()
@Module({})
export class ConfigModule {
  static config(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
