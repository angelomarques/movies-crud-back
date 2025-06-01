import { IsNotEmpty } from 'class-validator';
import { DataModel } from 'src/data/entities/data.entity';
import { Column, Entity } from 'typeorm';
import { MovieGenre } from '../enums/genre.enum';

@Entity('movies')
export class Movie extends DataModel {
  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column({ name: 'original_title' })
  originalTitle: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @IsNotEmpty()
  @Column({ type: 'bigint' })
  budget: number;

  @IsNotEmpty()
  @Column({ name: 'release_date', type: 'timestamp' })
  releaseDate: Date;

  @IsNotEmpty()
  @Column({ name: 'image_url' })
  imageUrl: string;

  @IsNotEmpty()
  @Column({ type: 'int' })
  duration: number;

  @Column({
    type: 'enum',
    enum: MovieGenre,
    default: MovieGenre.OTHER,
  })
  @IsNotEmpty()
  genre: MovieGenre;
}
