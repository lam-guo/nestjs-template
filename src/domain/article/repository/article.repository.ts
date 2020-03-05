import { EntityRepository, Repository } from 'typeorm';
import { Article } from '../entity/article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  constructor() {
    super();
  }

  async get(id: string): Promise<Article> {
    const result = await super.findOne(id);
    return result;
  }

  async add(attr: Article) {
    return await super.create(attr);
  }
}
