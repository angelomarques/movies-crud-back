import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DataModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at', type: 'bigint' })
  @CreateDateColumn()
  createdAt: number;

  @Column({ name: 'updated_at', type: 'bigint', nullable: true })
  @UpdateDateColumn()
  updatedAt?: number;
}
