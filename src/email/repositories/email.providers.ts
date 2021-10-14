import {Connection} from 'typeorm';
import {Email} from "./email.entity"

export const emailProviders = [
  {
    provide: "EMAIL_REPOSITORY",
    useFactory: (connection: Connection) => connection.getRepository(Email),
    inject: ["DATABASE_CONNECTION"]
  }
]