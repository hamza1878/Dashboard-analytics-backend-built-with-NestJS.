import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from '../rides/ride.entity';
import { Driver } from '../drivers/driver.entity';
import { SupportTicket } from '../support/support-ticket.entity';
import { RideRating } from '../ratings/ride-rating.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ride, Driver, SupportTicket, RideRating, Vehicle])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
