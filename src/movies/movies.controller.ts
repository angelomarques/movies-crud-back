import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { MoviePaginationQueryDto } from 'src/movies/dtos/pagination-query';
import { CreateUpdateMovieDto } from './dtos/create-update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Auth()
  @Get()
  findAll(@Query() paginationQueryDto: MoviePaginationQueryDto) {
    return this.moviesService.findAll(paginationQueryDto);
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
