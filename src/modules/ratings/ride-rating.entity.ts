import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Ride } from '../rides/ride.entity';

@Entity('ride_ratings')
export class RideRating {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) ride_id: string;
  @Column({ type: 'smallint', nullable: true }) passenger_rating: number;
  @Column({ type: 'smallint', nullable: true }) driver_rating: number;
  @Column({ type: 'text', nullable: true }) passenger_comment: string;
  @Column({ type: 'text', nullable: true }) driver_comment: string;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;

  @OneToOne(() => Ride) @JoinColumn({ name: 'ride_id' }) ride: Ride;
}
