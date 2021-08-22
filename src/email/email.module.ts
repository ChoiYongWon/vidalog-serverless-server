import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EmailController } from './controllers/email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './repositories/email.entity';
import { UserModule } from '../user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Email]), MailerModule.forRoot({
    transport: {
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      secure: false,
      port: process.env.EMAIL_PORT,
      requireTLS : true,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      }
    },
    defaults: {
      from:'"nest-modules" <modules@nestjs.com>',
    }
  })],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
