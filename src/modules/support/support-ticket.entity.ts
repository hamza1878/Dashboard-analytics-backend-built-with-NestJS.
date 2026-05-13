import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TicketMessage } from './ticket-message.entity';

export enum TicketStatus { OPEN = 'open', IN_PROGRESS = 'in_progress', RESOLVED = 'resolved', CLOSED = 'closed' }
export enum TicketCategory { PAYMENT = 'payment', RIDE = 'ride', DRIVER = 'driver', ACCOUNT = 'account', OTHER = 'other' }

@Entity('support_tickets')
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ length: 200 }) subject: string;
  @Column({ type: 'text' }) description: string;
  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN }) status: TicketStatus;
  @Column({ type: 'enum', enum: TicketCategory, default: TicketCategory.OTHER }) category: TicketCategory;
  @Column() author_id: string;
  @Column({ nullable: true }) assigned_admin_id: string;
  @Column({ nullable: true }) resolved_at: Date;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;

  @OneToMany(() => TicketMessage, (m) => m.ticket) messages: TicketMessage[];
}
