import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DispatchService } from './dispatch.service';
import { OfferStatus } from './dispatch-offer.entity';

@ApiTags('dispatch')
@Controller('dispatch')
export class DispatchController {
  constructor(private readonly service: DispatchService) {}

  @Get('offers')
  @ApiOperation({ summary: 'List dispatch offers' })
  @ApiQuery({ name: 'status', enum: OfferStatus, required: false })
  findAll(@Query('status') status?: OfferStatus) {
    return this.service.findAll(status);
  }

  @Get('offers/stats')
  @ApiOperation({ summary: 'Dispatch offer stats by status' })
  getStats() { return this.service.getDispatchStats(); }

  @Get('offers/ride/:ride_id')
  @ApiOperation({ summary: 'Get all dispatch offers for a ride' })
  findByRide(@Param('ride_id') ride_id: string) {
    return this.service.findByRide(ride_id);
  }
}
