import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './guards/strategies/local.strategy';
import { JwtStrategy } from './guards/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:()=>({
        secret : process.env.AUTH_ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: '12h'
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
  exports: [AuthService, UserModule]
})
export class AuthModule {}
