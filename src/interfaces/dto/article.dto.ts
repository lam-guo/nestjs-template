import { IsString, IsInt, ValidateIf, IsNumber, IsObject, IsIn, ValidateNested, Allow, IsArray, Min, MinLength } from 'class-validator';
import { Expose, Type, Exclude } from 'class-transformer';
import { ObjectID } from 'typeorm';

export class TravelArticleDto {
  @IsString()
  parentId?: string;
}

class User {
  @IsNumber({ allowNaN: false, allowInfinity: false }, {})
  uid: number;

  @IsString()
  name: string;
}

@Expose()
export class CreateArticleDto {
  @MinLength(2)
  @IsString()
  title: string;

  @IsString()
  expireDate: Date;
}

export class DetailAtrributeDto {
  @IsString()
  readonly id: string;
}

@Expose()
export class UpdateArticleDto {
  @IsString()
  id: ObjectID;

  @IsString()
  title: string;


  @IsString()
  expireDate: Date;

}

export class GetUserAttrDto {
  @IsNumber()
  readonly uid: number;
}

export class StatisticDto {
  @IsArray()
  readonly conditions;
}
