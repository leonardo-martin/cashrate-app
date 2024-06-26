import { User } from 'src/users/user.entity';

export default () => ({
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [User],
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  },
});
