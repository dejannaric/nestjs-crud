import {IsEnum, IsNumber, IsOptional, Max, Min} from "class-validator";

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class RequestPaginationFilter {
  @IsNumber()
  @Min(1)
  readonly page?: number = 1;

  @IsNumber()
  @Min(3)
  @Max(10)
  readonly pageSize?: number = 3;

  @IsOptional()
  readonly orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  readonly sortOrder?: SortOrder = SortOrder.DESC;
}