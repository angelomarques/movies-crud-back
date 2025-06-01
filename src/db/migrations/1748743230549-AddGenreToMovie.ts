import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenreToMovie1748743230549 implements MigrationInterface {
    name = 'AddGenreToMovie1748743230549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."movies_genre_enum" AS ENUM('Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Sci-Fi', 'Animation', 'Documentary', 'Family', 'Crime', 'Adventure', 'Other')`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "genre" "public"."movies_genre_enum" NOT NULL DEFAULT 'Other'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "genre"`);
        await queryRunner.query(`DROP TYPE "public"."movies_genre_enum"`);
    }

}
