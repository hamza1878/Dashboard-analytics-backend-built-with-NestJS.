import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum MembershipLevel { GO = 'Moviroo Go', PLUS = 'Moviroo Plus', ELITE = 'Moviroo Elite' }
export enum PaymentMethod { CASH = 'cash', CARD = 'card', WALLET = 'wallet' }

@Entity('passengers')
export class Passenger {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() user_id: string;
  @Column({ type: 'enum', enum: PaymentMethod, nullable: true }) default_payment_method: PaymentMethod;
  @Column({ type: 'jsonb', nullable: true }) payment_addresses: object;
  @Column({ length: 255, nullable: true, unique: true }) stripe_customer_id: string;
  @Column({ default: 0 }) membership_points: number;
  @Column({ type: 'enum', enum: MembershipLevel, default: MembershipLevel.GO }) membership_level: MembershipLevel;
  @Column({ default: 0 }) total_bookings: number;
  @Column({ type: 'numeric', precision: 3, scale: 2, default: 5 }) rating_average: number;
  @Column({ default: 0 }) total_ratings: number;
  @Column({ length: 100, nullable: true }) emergency_contact_name: string;
  @Column({ length: 20, nullable: true }) emergency_contact_phone: string;
  @Column({ default: false }) newsletter_opt_in: boolean;
  @Column({ length: 20, nullable: true, unique: true }) referral_code: string;
  @Column({ nullable: true }) referred_by: string;
  @Column({ nullable: true }) preferred_class_id: string;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at: Date;

  @OneToOne(() => User) @JoinColumn({ name: 'user_id' }) user: User;
}
