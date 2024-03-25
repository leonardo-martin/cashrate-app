import { User } from 'src/users/user.entity';

export default () => ({
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    entities: [User],
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  },
});
