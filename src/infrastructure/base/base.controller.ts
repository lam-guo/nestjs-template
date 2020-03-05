import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { BaseService } from './base.service';
import { DeepPartial } from 'typeorm';
import * as _ from 'lodash';

@Controller()
export abstract class BaseController<T> {
  protected constructor(protected readonly service: BaseService<T>) {}

  @Post('/list')
  public async list(@Body() body: any) {
    const page = Number(body.page) || 0;
    const limit = Number(body.limit) || 20;
    const order = body.order || { order: 'ASC' };
    const select = body.select;
    const where = _.omit(body, ['page', 'limit', 'order', 'select']);
    return this.service.list({ page, limit }, where, order, select);
  }

  @Post('/create')
  public async create(@Body() body: DeepPartial<T>) {
    return this.service.create(body);
  }
}
