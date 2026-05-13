import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiQuery({ name: 'role', required: false, enum: ['passenger', 'driver', 'admin'] })
  findAll(@Query('role') role?: string) {
    return this.service.findAll(role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/ban')
  @ApiOperation({ summary: 'Ban a user' })
  ban(@Param('id') id: string, @Body('reason') reason: string) {
    return this.service.ban(id, reason);
  }

  @Patch(':id/unban')
  @ApiOperation({ summary: 'Unban a user' })
  unban(@Param('id') id: string) {
    return this.service.unban(id);
  }
}
