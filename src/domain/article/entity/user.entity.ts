import { IsNumber, IsString } from 'class-validator';

export class User {
  @IsNumber({ allowNaN: false, allowInfinity: false }, {})
  uid: number;

  @IsString()
  name: string;
}
