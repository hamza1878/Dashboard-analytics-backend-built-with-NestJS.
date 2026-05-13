import { Controller, Get, Post, Param, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { TicketStatus, TicketCategory } from './support-ticket.entity';

@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly service: SupportService) {}

  @Get('tickets')
  @ApiOperation({ summary: 'List support tickets' })
  @ApiQuery({ name: 'status', enum: TicketStatus, required: false })
  @ApiQuery({ name: 'category', enum: TicketCategory, required: false })
  findAll(@Query('status') status?: TicketStatus, @Query('category') category?: TicketCategory) {
    return this.service.findAll(status, category);
  }

  @Get('tickets/stats')
  @ApiOperation({ summary: 'Support ticket stats & hourly resolution chart data' })
  getStats() { return this.service.getStats(); }

  @Get('tickets/:id')
  @ApiOperation({ summary: 'Get ticket with messages' })
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Patch('tickets/:id/resolve')
  @ApiOperation({ summary: 'Resolve a ticket' })
  resolve(@Param('id') id: string, @Body('admin_id') admin_id: string) {
    return this.service.resolve(id, admin_id);
  }

  @Post('tickets/:id/messages')
  @ApiOperation({ summary: 'Add a message to a ticket' })
  addMessage(
    @Param('id') ticket_id: string,
    @Body('sender_id') sender_id: string,
    @Body('body') body: string,
  ) {
    return this.service.addMessage(ticket_id, sender_id, body);
  }
}
