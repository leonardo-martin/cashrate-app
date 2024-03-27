import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { WorksService } from './works.service';
import { CreateWorkDto } from './dtos/create-work.dto';
import { UsersService } from 'src/users/users.service';
import { getSingleUserFormatted } from 'src/utils/getUserFormat';

@Controller('works')
export class WorksController {
  constructor(
    private readonly worksService: WorksService,
    private usersService: UsersService,
  ) {}

  @Post()
  async createWork(@Body() body: CreateWorkDto) {
    console.log('Request ---> Create work --> body ->', body);

    const user = getSingleUserFormatted(
      await this.usersService.findById(body.userId),
    );

    if (!user) {
      throw new BadRequestException('User not found');
    }

    console.log('Request ---> Create work --> user found -> ', user);

    this.worksService.create(
      body.userId,
      body.workName,
      body.workPayRate,
      body.workTaxRate,
    );

    return {
      userId: body.userId,
      workName: body.workName,
      workPayRate: body.workPayRate,
      workTaxRate: body.workTaxRate,
      createdAt: new Date(),
    };
  }
}
