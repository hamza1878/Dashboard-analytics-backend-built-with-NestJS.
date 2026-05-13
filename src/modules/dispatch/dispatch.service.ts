import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DispatchOffer, OfferStatus } from './dispatch-offer.entity';

@Injectable()
export class DispatchService {
  constructor(@InjectRepository(DispatchOffer) private repo: Repository<DispatchOffer>) {}

  findByRide(ride_id: string) {
    return this.repo.find({ where: { ride_id }, relations: ['driver'], order: { score: 'DESC' } });
  }

  async getDispatchStats() {
    const result = await this.repo
      .createQueryBuilder('o')
      .select('o.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .addSelect('ROUND(AVG(o.distance_to_pickup_km), 2)', 'avg_distance_km')
      .groupBy('o.status')
      .getRawMany();
    return result;
  }

  findAll(status?: OfferStatus) {
    const where: any = {};
    if (status) where.status = status;
    return this.repo.find({ where, relations: ['driver', 'ride'], order: { created_at: 'DESC' }, take: 100 });
  }
}
