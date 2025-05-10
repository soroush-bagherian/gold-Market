import { IsNumber } from "class-validator";

export class MakeOrderDto {
    @IsNumber()
    orderVolume: number;
  }
  