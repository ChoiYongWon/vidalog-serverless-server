import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repositories/user.entity';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../db/db.module';
import { userProviders } from './repositories/user.providers';

@Module({
  imports: [DatabaseModule , JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:()=>({
      secret : process.env.AUTH_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '12h'
      }
    })

  })],
  providers: [...userProviders, UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
