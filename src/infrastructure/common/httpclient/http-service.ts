import { HttpService, Injectable } from '@nestjs/common';
import * as qs from 'qs';

@Injectable()
export class HttpServices {
  constructor(private readonly httpService: HttpService) {}

  async iGet(options: HttpOptions, data?: any) {
    const config = {
      data,
      headers: options.headers,
    };
    const rs = await this.httpService.get(options.url, config).toPromise();
    return rs.data;
  }

  async iPost(options: HttpOptions, param?: any) {
    const { url, config } = transeFormer(options, param);
    const rs = await this.httpService.post(url, config).toPromise();
    return rs.data;
  }

  async iPut(options: HttpOptions, param?: any) {
    const { url, config } = transeFormer(options, param);
    const rs = await this.httpService.put(url, config).toPromise();
    return rs.data;
  }

  async iPatch(options: HttpOptions, param?: any) {
    const { url, config } = transeFormer(options, param);
    const rs = await this.httpService.patch(url, config).toPromise();
    return rs.data;
  }

  async iDelete(options: HttpOptions, data?: any) {
    const config = {
      data,
      headers: options.headers,
    };
    const rs = await this.httpService.delete(options.url, config).toPromise();
    return rs.data;
  }
}

function transeFormer(options: HttpOptions, data?: any) {
  const config = {
    json: true,
    data,
  };
  if (options.type === 'inner') {
    config.data = {
      seqno: options.seqno,
      cmd: options.cmd,
      verifycode: 'test',
      version: {
        ver: '1.0.0',
        charse: 'utf8',
      },
      auth: {
        token: '',
        userid: '',
        platform: '',
        appid: '',
      },
      data,
    };
  } else {
    if (!options.json) {
      config.json = false;
      config.data = qs.stringify(data);
    }
  }
  return { url: options.url, config };
}

export interface HttpOptions {
  url: string;
  cmd?: string;
  headers?: any;
  seqno?: string;
  type?: 'inner' | 'other';
  json?: boolean;
}
