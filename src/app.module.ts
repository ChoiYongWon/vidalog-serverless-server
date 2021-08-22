import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { PostModule } from './post/post.module';
import { S3Module } from './s3/s3.module';
import { MulterModule } from './multer/multer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), TypeOrmModule.forRoot({
    type: "mariadb",
    host: process.env.DB_HOST_URL,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false,
    autoLoadEntities: true
  }), AuthModule, UserModule, EmailModule, PostModule, S3Module, MulterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
