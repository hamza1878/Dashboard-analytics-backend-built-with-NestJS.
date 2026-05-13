import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ride } from '../rides/ride.entity';
import { User } from '../users/user.entity';

export enum OfferStatus { PENDING = 'PENDING', ACCEPTED = 'ACCEPTED', REJECTED = 'REJECTED', EXPIRED = 'EXPIRED' }

@Entity('dispatch_offers')
export class DispatchOffer {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() ride_id: string;
  @Column() driver_id: string;
  @Column() offered_at: Date;
  @Column() expires_at: Date;
  @Column({ type: 'enum', enum: OfferStatus, default: OfferStatus.PENDING }) status: OfferStatus;
  @Column({ length: 255, nullable: true }) rejection_reason: string;
  @Column({ type: 'numeric', precision: 6, scale: 2 }) distance_to_pickup_km: number;
  @Column({ type: 'numeric', precision: 8, scale: 4 }) score: number;
  @CreateDateColumn() created_at: Date;

  @ManyToOne(() => Ride) @JoinColumn({ name: 'ride_id' }) ride: Ride;
  @ManyToOne(() => User) @JoinColumn({ name: 'driver_id' }) driver: User;
}
