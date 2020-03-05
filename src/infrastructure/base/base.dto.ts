import { IsNumber } from 'class-validator';

export class Paginate {
  public total: number;
  public current_page: number;
  public data: any;
}

export interface Pagination {
  page: number;
  limit: number;
}

export class ListDto implements Pagination {
  public page: number;
  public limit: number;
}

export class ListBodyDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
  order?: any;
  select?: any;
  where?: any;
}
