import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repositories/user.entity';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret : process.env.AUTH_ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: '12h'
    }
  })],
  providers: [UserService],
  exports: [UserService, TypeOrmModule.forFeature([User])],
  controllers: [UserController]
})
export class UserModule {}
