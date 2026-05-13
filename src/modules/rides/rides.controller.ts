import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RidesService } from './rides.service';
import { RideStatus } from './ride.entity';

@ApiTags('rides')
@Controller('rides')
export class RidesController {
  constructor(private readonly service: RidesService) {}

  @Get()
  @ApiOperation({ summary: 'List rides with filters & pagination' })
  @ApiQuery({ name: 'status', enum: RideStatus, required: false })
  @ApiQuery({ name: 'driver_id', required: false })
  @ApiQuery({ name: 'passenger_id', required: false })
  @ApiQuery({ name: 'from', required: false, description: 'ISO date' })
  @ApiQuery({ name: 'to', required: false, description: 'ISO date' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() q: any) {
    return this.service.findAll(q);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Ride stats (total, completed, revenue, completion rate)' })
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  getStats(@Query('from') from?: string, @Query('to') to?: string) {
    return this.service.getStats(from, to);
  }

  @Get('revenue-by-day')
  @ApiOperation({ summary: 'Daily revenue trend for the last N days' })
  @ApiQuery({ name: 'days', required: false, type: Number })
  getRevenueByDay(@Query('days') days?: number) {
    return this.service.getRevenueByDay(days || 7);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ride by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a ride' })
  cancel(@Param('id') id: string, @Body('reason') reason: string) {
    return this.service.cancel(id, reason);
  }
}
