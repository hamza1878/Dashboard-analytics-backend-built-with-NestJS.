import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket, TicketStatus, TicketCategory } from './support-ticket.entity';
import { TicketMessage } from './ticket-message.entity';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportTicket) private ticketRepo: Repository<SupportTicket>,
    @InjectRepository(TicketMessage) private messageRepo: Repository<TicketMessage>,
  ) {}

  findAll(status?: TicketStatus, category?: TicketCategory) {
    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    return this.ticketRepo.find({ where, order: { created_at: 'DESC' } });
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id }, relations: ['messages'] });
    if (!ticket) throw new NotFoundException(`Ticket ${id} not found`);
    return ticket;
  }

  async resolve(id: string, admin_id: string) {
    await this.ticketRepo.update(id, {
      status: TicketStatus.RESOLVED,
      assigned_admin_id: admin_id,
      resolved_at: new Date(),
    });
    return this.findOne(id);
  }

  async addMessage(ticket_id: string, sender_id: string, body: string) {
    const msg = this.messageRepo.create({ ticket_id, sender_id, body });
    return this.messageRepo.save(msg);
  }

  async getStats() {
    const [total, open, resolved] = await Promise.all([
      this.ticketRepo.count(),
      this.ticketRepo.count({ where: { status: TicketStatus.OPEN } }),
      this.ticketRepo.count({ where: { status: TicketStatus.RESOLVED } }),
    ]);
    const byCategory = await this.ticketRepo
      .createQueryBuilder('t')
      .select('t.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('t.category')
      .getRawMany();
    const byHour = await this.ticketRepo
      .createQueryBuilder('t')
      .select("DATE_TRUNC('hour', t.created_at)", 'hour')
      .addSelect('COUNT(*) FILTER (WHERE t.status = \'resolved\')', 'resolved')
      .addSelect('COUNT(*) FILTER (WHERE t.status = \'open\')', 'pending')
      .where('t.created_at >= NOW() - INTERVAL \'24 hours\'')
      .groupBy('hour')
      .orderBy('hour', 'ASC')
      .getRawMany();
    return { total, open, resolved, resolution_rate: total ? ((resolved / total) * 100).toFixed(1) : '0', by_category: byCategory, by_hour: byHour };
  }
}
