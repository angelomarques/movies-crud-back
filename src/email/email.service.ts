import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');

    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured.');
    }

    const fromEmailKey = this.configService.get<string>('EMAIL_FROM_ADDRESS');

    if (!fromEmailKey) {
      throw new Error('EMAIL_FROM_ADDRESS is not configured.');
    }

    this.fromEmail = fromEmailKey;

    this.resend = new Resend(apiKey);
  }

  async sendNewReleasesEmail(user: User, movies: Movie[]): Promise<void> {
    if (movies.length === 0) {
      return;
    }

    const subject = '🎬 Novos filmes que lançaram hoje!';
    let htmlContent = `<h1>Olá ${user.name || 'there'},</h1>`;
    htmlContent += `<p>Dá uma olhada nesses filmes que lançaram hoje:</p>`;
    htmlContent += '<ul>';
    movies.forEach((movie) => {
      htmlContent += `<li style="list-style-type: none; display: flex; align-items:center; gap: 8px; margin-top: 8px"><img src="${movie.imageUrl}" style="object-fit: cover;" alt="${movie.title}" width="100" height="100" /><strong>${movie.title}</strong> - ${movie.description || 'Coming soon!'}</li>`;
    });
    htmlContent += '</ul>';
    htmlContent += '<p>Divirta-se!</p>';

    try {
      const { error } = await this.resend.emails.send({
        from: this.fromEmail,
        to: [user.email],
        subject: subject,
        html: htmlContent,
      });

      if (error) {
        return;
      }
    } catch (_e) {
      return;
    }
  }
}
