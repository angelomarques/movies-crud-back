import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DataModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  @CreateDateColumn()
  createdAt: number;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  @UpdateDateColumn()
  updatedAt?: number;
}
