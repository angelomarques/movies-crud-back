import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataModel } from 'src/data/entities/data.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from './base-repository.repository';

export function getBaseRepositoryToken<T extends DataModel>(
  entity: Type<T>,
): symbol {
  return Symbol.for(`BaseRepository<${entity.name}>`);
}

@Module({})
export class BaseRepositoryCoreModule {
  static forFeature<T extends DataModel>(entity: Type<T>): DynamicModule {
    const repositoryToken = getBaseRepositoryToken(entity);

    const repositoryProvider: Provider = {
      provide: repositoryToken,
      useFactory: (ormRepository: Repository<T>) => {
        return new BaseRepository<T>(ormRepository);
      },
      inject: [getRepositoryToken(entity)],
    };

    return {
      module: BaseRepositoryCoreModule,
      imports: [TypeOrmModule.forFeature([entity])],
      providers: [repositoryProvider],
      exports: [repositoryProvider],
    };
  }
}
