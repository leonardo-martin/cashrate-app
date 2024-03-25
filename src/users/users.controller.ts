import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { createHmac } from 'crypto';
import { encryptedSHA256Hash } from 'src/utils/encryptions';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const encryptedEmail = encryptedSHA256Hash(
      body.email,
      process.env.EMAIL_SECRET,
    );

    const existingUser = this.usersService.findOne(encryptedEmail);

    if (existingUser) {
      throw new BadRequestException('This email is already in use.');
    }

    this.usersService.create(body.name, body.email, body.password);
  }

  @Get('/')
  findUserByEmail(@Query('email') email: string) {
    const encryptedEmail = encryptedSHA256Hash(email, process.env.EMAIL_SECRET);

    return this.usersService.findOne(encryptedEmail);
  }
}
