import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { encryptedSHA256Hash } from 'src/utils/encryptions';
import { getUsersFormatted } from 'src/utils/getUserFormat';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    console.log('Request -> Signup user --> ', body);

    const encryptedEmail = encryptedSHA256Hash(
      body.email,
      process.env.EMAIL_SECRET,
    );

    const existingUser = await this.usersService.findByEmail(encryptedEmail);

    if (existingUser) {
      throw new BadRequestException('This email is already in use.');
    }

    this.usersService.create(body.name, body.email, body.password);

    return { name: body.name, email: body.email, createdAt: new Date() };
  }

  @Get('/users')
  async findAll() {
    const users = await this.usersService.findAll();

    const usersDto = getUsersFormatted(users);

    return usersDto;
  }

  @Get('/findByEmail')
  findUserByEmail(@Query('email') email: string) {
    const encryptedEmail = encryptedSHA256Hash(email, process.env.EMAIL_SECRET);

    return this.usersService.findByEmail(encryptedEmail);
  }
}
