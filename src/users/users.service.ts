import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(name: string, email: string, password: string) {
    const user = this.repo.create({ name, email, password });

    return this.repo.save(user);
  }

  findOne(email: string): Promise<User> {
    return this.repo.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async update(email: string, attrs: Partial<User>) {
    const user = await this.findOne(email);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(email: string) {
    const user = await this.findOne(email);
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }
}
