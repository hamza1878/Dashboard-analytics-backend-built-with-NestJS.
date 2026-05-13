import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindManyOptions } from 'typeorm';
import { Ride, RideStatus } from './ride.entity';

export interface RideFilters {
  status?: RideStatus;
  driver_id?: string;
  passenger_id?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class RidesService {
  constructor(@InjectRepository(Ride) private repo: Repository<Ride>) {}

  async findAll(filters: RideFilters) {
    const { status, driver_id, passenger_id, from, to, page = 1, limit = 20 } = filters;
    const where: any = {};
    if (status) where.status = status;
    if (driver_id) where.driver_id = driver_id;
    if (passenger_id) where.passenger_id = passenger_id;
    if (from && to) where.created_at = Between(new Date(from), new Date(to));

    const [data, total] = await this.repo.findAndCount({
      where,
      relations: ['passenger', 'driver'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const ride = await this.repo.findOne({ where: { id }, relations: ['passenger', 'driver'] });
    if (!ride) throw new NotFoundException(`Ride ${id} not found`);
    return ride;
  }

  async cancel(id: string, reason: string) {
    await this.repo.update(id, {
      status: RideStatus.CANCELLED,
      cancellation_reason: reason,
      cancelled_at: new Date(),
    });
    return this.findOne(id);
  }

  async getStats(from?: string, to?: string) {
    const qb = this.repo.createQueryBuilder('r');
    if (from) qb.andWhere('r.created_at >= :from', { from: new Date(from) });
    if (to) qb.andWhere('r.created_at <= :to', { to: new Date(to) });

    const [total, completed, cancelled, revenue] = await Promise.all([
      qb.clone().getCount(),
      qb.clone().andWhere('r.status = :s', { s: RideStatus.COMPLETED }).getCount(),
      qb.clone().andWhere('r.status = :s', { s: RideStatus.CANCELLED }).getCount(),
      qb.clone()
        .andWhere('r.status = :s', { s: RideStatus.COMPLETED })
        .select('COALESCE(SUM(r.price_final), 0)', 'total')
        .getRawOne(),
    ]);

    return {
      total_rides: total,
      completed,
      cancelled,
      completion_rate: total ? ((completed / total) * 100).toFixed(1) : '0',
      total_revenue: parseFloat(revenue?.total || '0'),
    };
  }

  async getRevenueByDay(days = 7) {
    return this.repo
      .createQueryBuilder('r')
      .select("DATE_TRUNC('day', r.created_at)", 'day')
      .addSelect('COUNT(*)', 'rides')
      .addSelect('COALESCE(SUM(r.price_final), 0)', 'revenue')
      .where('r.status = :s', { s: RideStatus.COMPLETED })
      .andWhere('r.created_at >= NOW() - INTERVAL :interval', { interval: `${days} days` })
      .groupBy('day')
      .orderBy('day', 'ASC')
      .getRawMany();
  }
}
