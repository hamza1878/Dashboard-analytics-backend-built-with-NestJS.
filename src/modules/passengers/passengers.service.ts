import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './passenger.entity';

@Injectable()
export class PassengersService {
  constructor(@InjectRepository(Passenger) private repo: Repository<Passenger>) {}

  findAll() {
    return this.repo.find({ relations: ['user'], order: { created_at: 'DESC' } });
  }

  async findOne(id: string) {
    const p = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!p) throw new NotFoundException(`Passenger ${id} not found`);
    return p;
  }

  async getMembershipStats() {
    return this.repo
      .createQueryBuilder('p')
      .select('p.membership_level', 'level')
      .addSelect('COUNT(*)', 'count')
      .addSelect('AVG(p.membership_points)', 'avg_points')
      .groupBy('p.membership_level')
      .getRawMany();
  }
}
