import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { VehicleStatus } from './vehicle.entity';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}

  @Get()
  @ApiOperation({ summary: 'List vehicles' })
  @ApiQuery({ name: 'status', enum: VehicleStatus, required: false })
  @ApiQuery({ name: 'driver_id', required: false })
  findAll(@Query('status') status?: VehicleStatus, @Query('driver_id') driver_id?: string) {
    return this.service.findAll(status, driver_id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Fleet statistics by status' })
  getFleetStats() {
    return this.service.getFleetStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vehicle by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a vehicle' })
  approve(@Param('id') id: string) {
    return this.service.approve(id);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a vehicle' })
  reject(@Param('id') id: string) {
    return this.service.reject(id);
  }
}
