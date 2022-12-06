import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationQueryDTO{
  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
