import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DataModel } from 'src/data/entities/data.entity';

export class BaseRepository<T extends DataModel, E = DeepPartial<T>> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(createDto: E): Promise<T> {
    const entity = this.repository.create(createDto as DeepPartial<T>);

    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount(options);
  }

  async findOneById(
    id: DataModel['id'],
    options?: FindOneOptions<T>,
  ): Promise<T | null> {
    const findOptions = {
      where: { id },
      ...options,
    } as FindOneOptions<T>;

    return this.repository.findOne(findOptions);
  }

  async findOneByIdOrFail(
    id: DataModel['id'],
    options?: FindOneOptions<T>,
  ): Promise<T> {
    const entity = await this.findOneById(id, options);

    if (!entity) {
      throw new NotFoundException(
        `${this.repository.metadata.name} with ID ${id} not found`,
      );
    }

    return entity;
  }

  async findOneOrFail(options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(options as FindOneOptions<T>);

    if (!entity) {
      throw new NotFoundException(`${this.repository.metadata.name} not found`);
    }

    return entity;
  }

  async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    const entity = await this.repository.findOne(options as FindOneOptions<T>);

    return entity;
  }

  async update(id: DataModel['id'], updateDto: DeepPartial<T>): Promise<T> {
    await this.findOneByIdOrFail(id);

    await this.repository.update(id, updateDto as any);

    return this.findOneByIdOrFail(id);
  }

  async delete(id: DataModel['id']): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `${this.repository.metadata.name} with ID ${id} not found for deletion`,
      );
    }
  }
}
