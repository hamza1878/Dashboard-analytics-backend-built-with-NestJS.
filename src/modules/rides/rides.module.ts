import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './ride.entity';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ride])],
  providers: [RidesService],
  controllers: [RidesController],
  exports: [RidesService],
})
export class RidesModule {}
