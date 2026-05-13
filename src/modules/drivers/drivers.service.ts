import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Driver, DriverAvailabilityStatus } from './driver.entity';

@Injectable()
export class DriversService {
  constructor(@InjectRepository(Driver) private repo: Repository<Driver>) {}

  findAll(status?: DriverAvailabilityStatus) {
    const where: any = {};
    if (status) where.availability_status = status;
    return this.repo.find({ where, relations: ['user'], order: { created_at: 'DESC' } });
  }

  async findOne(id: string) {
    const driver = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!driver) throw new NotFoundException(`Driver ${id} not found`);
    return driver;
  }

  async updateStatus(id: string, status: DriverAvailabilityStatus) {
    await this.repo.update(id, { availability_status: status });
    return this.findOne(id);
  }

  /** Drivers currently available to take a ride (online but not on a trip) */
  async getActiveCount() {
    return this.repo.count({
      where: { availability_status: DriverAvailabilityStatus.ONLINE },
    });
  }

  /** Count by each status — useful for ops overview */
  async getStatusBreakdown() {
    return this.repo
      .createQueryBuilder('d')
      .select('d.availability_status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('d.availability_status')
      .getRawMany();
  }

  async getTopDrivers(limit = 10) {
    return this.repo.find({
      relations: ['user'],
      order: { rating_average: 'DESC', total_trips: 'DESC' },
      take: limit,
    });
  }
}
