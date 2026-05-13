import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly service: RatingsService) {}

  @Get()
  @ApiOperation({ summary: 'List all ride ratings' })
  findAll() { return this.service.findAll(); }

  @Get('stats')
  @ApiOperation({ summary: 'Satisfaction rate & distribution — powers the dashboard KPI card' })
  getStats() { return this.service.getSatisfactionStats(); }

  @Get('ride/:ride_id')
  @ApiOperation({ summary: 'Get rating for a specific ride' })
  findByRide(@Param('ride_id') ride_id: string) { return this.service.findByRide(ride_id); }
}
