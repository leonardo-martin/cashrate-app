import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(name: string, email: string, password: string) {
    const user = this.repo.create({ name, email, password });

    return this.repo.save(user);
  }

  findById(id: number): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.repo.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }
}
