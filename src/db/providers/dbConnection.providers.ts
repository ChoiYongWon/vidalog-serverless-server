import {createConnection} from 'typeorm';
import { User } from '../../user/repositories/user.entity';
import { Email } from '../../email/repositories/email.entity';
import { Post } from '../../post/repositories/post.entity';

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async () => await createConnection({
      type: "mariadb",
      host: process.env.DB_HOST_URL,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Email, Post],
      //__dirname + '/../**/*.entity{.ts,.js}'
      //dist/**/*.entity{.ts,.js}
      synchronize: false,
    })
  }
]