import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorksService } from './works.service';
import { Work } from './work.entity';
import { WorksController } from './works.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work, User])],
  controllers: [WorksController],
  providers: [WorksService, UsersService],
})
export class WorksModule {}
