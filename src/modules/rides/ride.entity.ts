import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum RideStatus {
  PENDING = 'PENDING', ACCEPTED = 'ACCEPTED', ENROUTE = 'ENROUTE',
  ARRIVED = 'ARRIVED', IN_PROGRESS = 'IN_PROGRESS', COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED', NO_DRIVER = 'NO_DRIVER',
}

@Entity('rides')
export class Ride {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() passenger_id: string;
  @Column({ nullable: true }) driver_id: string;
  @Column({ nullable: true }) vehicle_id: string;
  @Column() class_id: string;
  @Column({ type: 'enum', enum: RideStatus, default: RideStatus.PENDING }) status: RideStatus;
  @Column({ length: 500 }) pickup_address: string;
  @Column({ type: 'float' }) pickup_lat: number;
  @Column({ type: 'float' }) pickup_lon: number;
  @Column({ length: 500 }) dropoff_address: string;
  @Column({ type: 'float' }) dropoff_lat: number;
  @Column({ type: 'float' }) dropoff_lon: number;
  @Column({ type: 'float', nullable: true }) distance_km: number;
  @Column({ type: 'float', nullable: true }) duration_min: number;
  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true }) price_estimate: number;
  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true }) price_final: number;
  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true }) surge_multiplier: number;
  @Column({ type: 'jsonb', nullable: true }) pricing_snapshot: object;
  @Column({ type: 'jsonb', nullable: true }) dispatch_snapshot: object;
  @Column({ nullable: true }) scheduled_at: Date;
  @Column({ nullable: true }) confirmed_at: Date;
  @Column({ nullable: true }) cancelled_at: Date;
  @Column({ length: 500, nullable: true }) cancellation_reason: string;
  @Column({ nullable: true }) enroute_at: Date;
  @Column({ nullable: true }) arrived_at: Date;
  @Column({ nullable: true }) trip_started_at: Date;
  @Column({ nullable: true }) completed_at: Date;
  @Column({ type: 'float', nullable: true }) distance_km_real: number;
  @Column({ type: 'float', nullable: true }) duration_min_real: number;
  @Column({ default: 0 }) loyalty_points_earned: number;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;

  @ManyToOne(() => User) @JoinColumn({ name: 'passenger_id' }) passenger: User;
  @ManyToOne(() => User) @JoinColumn({ name: 'driver_id' }) driver: User;
}
