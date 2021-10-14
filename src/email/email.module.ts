import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EmailController } from './controllers/email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './repositories/email.entity';
import { UserModule } from '../user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../db/db.module';
import { emailProviders } from './repositories/email.providers';

@Module({
  imports: [DatabaseModule ,UserModule, MailerModule.forRootAsync({
    inject:[ConfigService],
    useFactory: ()=>({
      transport: {
        service: "naver",
        host: "smtp.naver.com",
        secure: false,
        port: 587,
        requireTLS : true,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASSWORD,
        }
      },
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      }
    })

  })],
  controllers: [EmailController],
  providers: [...emailProviders, EmailService],
  exports: [EmailService]
})
export class EmailModule {}
