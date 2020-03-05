import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './infrastructure/common/pipe/global.validation.pipe';
import { GlobalBodyDataPipe } from './infrastructure/common/pipe/global.bodyData.pipe';
import { HttpExceptionFilter } from './infrastructure/common/filter/http-exception.filter';
import * as esg from 'express-swagger-generator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressSwagger = esg(app);

  const options = {
    swaggerDefinition: {
      info: {
        description: 'This is a sample server',
        title: 'Swagger',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/v1',
      produces: ['application/json', 'application/xml'],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        },
      },
    },
    basedir: __dirname, // app absolute path
    files: ['./**/*.js'], // Path to the API handle folder
  };
  expressSwagger(options);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new GlobalBodyDataPipe());
  app.useGlobalPipes(validationPipe);
  await app.listen(3000);
}
bootstrap();
