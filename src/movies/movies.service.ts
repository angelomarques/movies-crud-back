import { Injectable } from '@nestjs/common';
import { InjectBaseRepository } from 'src/commom/decorators/inject-base-repository';
import { Movie } from './entities/movie.entity';
import { BaseRepository } from 'src/base-repository/base-repository.repository';
import { CreateUpdateMovieDto } from './dtos/create-update-movie.dto';

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

  async findAll(): Promise<Movie[]> {
    const res = await this.movieRepository.findAll();

    return res;
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
