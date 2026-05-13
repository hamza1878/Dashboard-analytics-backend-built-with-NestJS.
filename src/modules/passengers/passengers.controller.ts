import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PassengersService } from './passengers.service';

@ApiTags('passengers')
@Controller('passengers')
export class PassengersController {
  constructor(private readonly service: PassengersService) {}

  @Get()
  @ApiOperation({ summary: 'List all passengers' })
  findAll() { return this.service.findAll(); }

  @Get('membership-stats')
  @ApiOperation({ summary: 'Membership level breakdown' })
  getMembershipStats() { return this.service.getMembershipStats(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get passenger by ID' })
  findOne(@Param('id') id: string) { return this.service.findOne(id); }
}
