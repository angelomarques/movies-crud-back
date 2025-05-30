import { Inject, Type } from '@nestjs/common';
import { getBaseRepositoryToken } from 'src/base-repository/base-repository.module';
import { DataModel } from 'src/data/entities/data.entity';

export function InjectBaseRepository<T extends DataModel>(entity: Type<T>) {
  const token = getBaseRepositoryToken(entity);

  return Inject(token);
}
