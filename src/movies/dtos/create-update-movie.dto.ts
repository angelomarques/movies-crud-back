import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

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

  @IsNotEmpty()
  releaseDate: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
