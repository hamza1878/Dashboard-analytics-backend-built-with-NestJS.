import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SupportTicket } from './support-ticket.entity';

@Entity('ticket_messages')
export class TicketMessage {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'text' }) body: string;
  @Column() sender_id: string;
  @Column() ticket_id: string;
  @CreateDateColumn() created_at: Date;

  @ManyToOne(() => SupportTicket, (t) => t.messages) @JoinColumn({ name: 'ticket_id' }) ticket: SupportTicket;
}
