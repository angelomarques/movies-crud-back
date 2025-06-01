import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';
import { MovieGenre } from '../enums/genre.enum';

export class CreateUpdateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  originalTitle: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  budget: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsEnum(MovieGenre)
  @IsNotEmpty()
  genre: MovieGenre;
}
