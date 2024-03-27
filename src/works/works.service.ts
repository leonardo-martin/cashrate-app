import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(Work) private workRepository: Repository<Work>,
  ) {}

  async create(
    userId: number,
    workName: string,
    workPayRate: number,
    workTaxRate: number,
  ) {
    const work = this.workRepository.create({
      userId,
      workName,
      workPayRate,
      workTaxRate,
    });

    return this.workRepository.save(work);
  }
}
