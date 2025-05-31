import { Injectable } from '@nestjs/common';
import { InjectBaseRepository } from 'src/commom/decorators/inject-base-repository';
import { Movie } from './entities/movie.entity';
import { BaseRepository } from 'src/base-repository/base-repository.repository';
import { CreateUpdateMovieDto } from './dtos/create-update-movie.dto';
import { PaginationQueryDto } from 'src/commom/dto/pagination-query';

@Injectable()
export class MoviesService {
  constructor(
    @InjectBaseRepository(Movie)
    private readonly movieRepository: BaseRepository<
      Movie,
      CreateUpdateMovieDto
    >,
  ) {}

  async findOneById(id: string): Promise<Movie> {
    const res = await this.movieRepository.findOneByIdOrFail(id);

    return res;
  }

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit = 10, page = 1 } = paginationQueryDto;

    const skip = (page - 1) * limit;

    const [data, total] = await this.movieRepository.findAndCount({
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        count: data.length,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(createMovieDto: CreateUpdateMovieDto): Promise<Movie> {
    const res = await this.movieRepository.create(createMovieDto);

    return res;
  }

  async update(
    id: string,
    updateMovieDto: CreateUpdateMovieDto,
  ): Promise<Movie> {
    const res = await this.movieRepository.update(id, updateMovieDto);

    return res;
  }

  async delete(id: string) {
    const res = await this.movieRepository.delete(id);

    return res;
  }
}
