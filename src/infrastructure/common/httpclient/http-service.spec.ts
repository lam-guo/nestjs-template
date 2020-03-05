import { Test, TestingModule } from '@nestjs/testing';
import { HttpServices, HttpOptions } from './http-service';
import { HttpModule, HttpService } from '@nestjs/common';

describe('http-service', () => {
  let httpServices: HttpServices;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule.register({ timeout: 3000 })],
      providers: [HttpServices],
      exports: [HttpServices],
    }).compile();

    httpServices = app.get<HttpServices>(HttpServices);
  });

  describe('root', () => {
    it('test get', async () => {
      const options: HttpOptions = { url: 'http://www.baidu.com' };
      expect(await httpServices.iGet(options)).toBeDefined();
    });
  });
});
