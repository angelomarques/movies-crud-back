import { IsNotEmpty } from 'class-validator';
import { DataModel } from 'src/data/entities/data.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends DataModel {
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;
}
