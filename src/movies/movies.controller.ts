import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Auth } from 'src/auth/auth.decorator';
import { Movie } from './entities/movie.entity';
import { CreateUpdateMovieDto } from './dtos/create-update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Auth()
  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOneById(id);
  }

  @Auth()
  @Post()
  create(@Body() createMovieDto: CreateUpdateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Auth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: CreateUpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }
}
