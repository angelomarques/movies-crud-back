import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class MoviePaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsIn(['short', 'medium', 'long'])
  durationCategory?: 'short' | 'medium' | 'long';

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsOptional()
  @IsString()
  search?: string;
}
