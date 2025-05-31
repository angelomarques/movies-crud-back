import { Injectable } from '@nestjs/common';
import { InjectBaseRepository } from 'src/commom/decorators/inject-base-repository';
import { Movie } from './entities/movie.entity';
import { BaseRepository } from 'src/base-repository/base-repository.repository';
import { CreateUpdateMovieDto } from './dtos/create-update-movie.dto';
import { MoviePaginationQueryDto } from 'src/movies/dtos/pagination-query';

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

  async findAll(paginationQueryDto: MoviePaginationQueryDto) {
    const { limit = 10, page = 1, durationCategory } = paginationQueryDto;

    const skip = (page - 1) * limit;

    const queryBuilder = this.movieRepository.createQueryBuilder('movie');

    queryBuilder.skip(skip).take(limit);

    if (durationCategory === 'short') {
      queryBuilder.andWhere(
        'movie.duration >= :min AND movie.duration < :max',
        {
          min: 0,
          max: 50,
        },
      );
    } else if (durationCategory === 'medium') {
      queryBuilder.andWhere(
        'movie.duration >= :min AND movie.duration < :max',
        {
          min: 50,
          max: 100,
        },
      );
    } else if (durationCategory === 'long') {
      queryBuilder.andWhere('movie.duration >= :min', { min: 100 });
    }

    const [data, total] = await queryBuilder.getManyAndCount();

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
