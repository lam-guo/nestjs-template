import { Injectable, Inject, Global, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { CONFIG_OPTIONS } from '../constant/constant';

export interface ConfigOptions {
  folder: string;
}

@Injectable()
export class ConfigService {
  private readonly config: any;
  private readonly logger: Logger;

  constructor(@Inject(CONFIG_OPTIONS) private readonly options: ConfigOptions) {
    try {
      this.logger = new Logger(ConfigService.name);
      const filePath = `${process.env.NODE_ENV || 'development'}.env.json`;
      const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
      this.logger.debug(`loading ${envFile} config file`);
      const buff = fs.readFileSync(envFile);
      this.config = JSON.parse(buff.toString());
      Object.keys(this.config).forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
          process.env[key] = this.config[key];
        } else {
          this.logger.error(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
        }
      });
    } catch (err) {
      this.logger.error(`${options.folder} parse error, ${err}`);
    }
  }

  public get(key: string): any {
    return this.config[key];
  }
}
