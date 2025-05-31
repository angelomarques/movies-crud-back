import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_S3_REGION')!;
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME')!;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        )!,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFileName = `${uuid()}.${fileExtension}`;
    const key = `${uniqueFileName}`;

    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        },
      });

      await upload.done();
      const url = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;

      return { url };
    } catch (error: any) {
      throw new HttpException(
        `S3 Upload Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
