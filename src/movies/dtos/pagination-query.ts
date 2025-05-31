import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsPositive } from 'class-validator';

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
}
