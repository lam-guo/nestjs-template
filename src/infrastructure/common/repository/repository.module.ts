import { ConfigModule } from '../../config/config.module';
import { Module, DynamicModule, Global, Logger } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { REPOSITORY_OPTIONS } from '../../constant/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export enum RepositoryType {
  TYPEORM,
  MONGOOSE,
}

export interface RepositoryModuleOptions {
  type: RepositoryType;
}

@Global()
@Module({
  imports: [],
  providers: [RepositoryService, { provide: REPOSITORY_OPTIONS, useValue: 'options' }],
  controllers: [],
  exports: [RepositoryService],
})
export class RepositoryModule {
  static type: RepositoryType;

  static config(options: RepositoryModuleOptions): DynamicModule {
    RepositoryModule.type = options.type;
    const logger = new Logger(RepositoryModule.name);
    // logger.debug(`RepositoryModule init...., ${RepositoryModule.type}`);

    if (options.type === RepositoryType.TYPEORM) {
      return {
        imports: [
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              type: configService.get('DBTYPE'),
              url: configService.get('DATABASE_URI'),
              // username: configService.get('DATABASE_USER'),
              // password: configService.get('DATABASE_PASSWORD'),
              cache: configService.get('DB_CACHE'),
              entities: ['dist/**/*.entity{.ts,.js}'],
              useUnifiedTopology: true,
              useNewUrlParser: true,
              synchronize: true,
            }),
            inject: [ConfigService],
          }),
        ],
        module: RepositoryModule,
      };
    } else if (options.type === RepositoryType.MONGOOSE) {
      return {
        imports: [
          MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              uri: configService.get('DATABASE_URI'),
            }),
            inject: [ConfigService],
          }),
        ],
        module: RepositoryModule,
      };
    }
  }

  static getRepository(entities: Function[]): DynamicModule {
    const logger = new Logger(RepositoryModule.name);
    // logger.debug(`getRepository init...., ${RepositoryModule.type}`);

    if (1) {
      return TypeOrmModule.forFeature(entities);
    } else if (RepositoryModule.type === RepositoryType.MONGOOSE) {
      const models = [];
      for (const item of entities) {
        const schema = new mongoose.Schema(item);
        const name = item.name;
        models.push({ name, schema });
      }
      return MongooseModule.forFeature(models);
    }
  }
}
