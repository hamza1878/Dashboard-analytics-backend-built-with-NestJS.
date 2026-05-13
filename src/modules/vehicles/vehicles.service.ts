import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle, VehicleStatus } from './vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(Vehicle) private repo: Repository<Vehicle>) {}

  findAll(status?: VehicleStatus, driver_id?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (driver_id) where.driver_id = driver_id;
    return this.repo.find({ where, order: { created_at: 'DESC' } });
  }

  async findOne(id: string) {
    const v = await this.repo.findOne({ where: { id } });
    if (!v) throw new NotFoundException(`Vehicle ${id} not found`);
    return v;
  }

  async approve(id: string) {
    await this.repo.update(id, { status: VehicleStatus.APPROVED, verified_at: new Date() });
    return this.findOne(id);
  }

  async reject(id: string) {
    await this.repo.update(id, { status: VehicleStatus.REJECTED });
    return this.findOne(id);
  }

  async getFleetStats() {
    const result = await this.repo
      .createQueryBuilder('v')
      .select('v.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('v.status')
      .getRawMany();
    const total = await this.repo.count();
    return { total, by_status: result };
  }
}
