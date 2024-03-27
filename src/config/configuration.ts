import { User } from 'src/users/user.entity';
import { Work } from 'src/works/work.entity';

export default () => ({
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    ssl: process.env.POSTGRES_SSL === 'true',
    entities: [User, Work],
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  },
});
