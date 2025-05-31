import { IsNotEmpty } from 'class-validator';
import { DataModel } from 'src/data/entities/data.entity';
import { Column, Entity } from 'typeorm';

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
  @Column({ name: 'release_date' })
  releaseDate: string;

  @IsNotEmpty()
  @Column({ name: 'image_url' })
  imageUrl: string;
}
