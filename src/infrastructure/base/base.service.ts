import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial, DeleteResult } from 'typeorm';
import { Paginate, Pagination } from './base.dto';

export abstract class BaseService<T> {
  /**
   * @param {Repository<T>} repo
   */
  constructor(protected repo: Repository<T>) {}

  /**
   * @readonly
   * @type {Repository<T>['findOne']}
   */
  public get findOne(): Repository<T>['findOne'] {
    return this.repo.findOne.bind(this.repo);
  }

  /**
   * @readonly
   * @type {Repository<T>['find']}
   */
  public get find(): Repository<T>['find'] {
    return this.repo.find.bind(this.repo);
  }

  /**
   * @description fineOne
   * @readonly
   * @param {string} id
   */
  public async getOne(id: string): Promise<T> {
    return await this.findOne(id);
  }

  /**
   * @description 获取分页数据
   * @param {Pagination} pagination
   * @param {*} [order]
   * @param {Partial<T>} [where]
   * @returns {Promise<Paginate>}
   */
  public async list(pagination: Pagination, where?: Partial<T>, order?: any, select?: any): Promise<Paginate> {
    const page = pagination.page > 0 ? pagination.page : 0;
    const [data, total] = await this.repo.findAndCount({
      take: pagination.limit,
      skip: page * pagination.limit,
      cache: true,
      order,
      select,
      where,
    });
    return {
      data,
      total,
      current_page: page,
    };
  }

  /**
   * @description 新增数据
   * @param data
   */
  public async create(data: DeepPartial<T>): Promise<T> {
    return await this.repo.save(data);
  }

  /**
   * @description 更新一条数据
   * @param id
   * @param data
   */
  public async updateOne(id: string, data: DeepPartial<T>): Promise<T> {
    const result = await this.repo.findOne(id);
    if (!result) {
      throw new NotFoundException('数据不存在');
    }
    return await this.repo.save(data);
  }

  /**
   * @description 删除一条数据
   * @param id
   */
  public async deleteOne(id: string): Promise<DeleteResult> {
    const result = await this.repo.findOne(id);
    if (!result) {
      throw new NotFoundException('数据不存在');
    }
    return await this.repo.delete(id);
  }

  /**
   * @description 批量删除
   * @param ids
   */
  public async delete(ids: string[]): Promise<DeleteResult> {
    return await this.repo.delete(ids);
  }
}
