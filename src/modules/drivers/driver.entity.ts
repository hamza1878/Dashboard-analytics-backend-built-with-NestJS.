import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum DriverAvailabilityStatus {
  PENDING        = 'pending',
  SETUP_REQUIRED = 'setup_required',
  OFFLINE        = 'offline',
  ONLINE         = 'online',
  ON_TRIP        = 'on_trip',
}

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() user_id: string;
  @Column({ length: 50, nullable: true }) driver_license_number: string;
  @Column({ type: 'date', nullable: true }) driver_license_expiry: string;
  @Column({ nullable: true }) driver_license_front_url: string;
  @Column({ nullable: true }) driver_license_back_url: string;
  @Column({ type: 'numeric', precision: 3, scale: 2, default: 5 }) rating_average: number;
  @Column({ default: 0 }) total_ratings: number;
  @Column({ default: 0 }) total_trips: number;
  @Column({
    type: 'enum',
    enum: DriverAvailabilityStatus,
    default: DriverAvailabilityStatus.PENDING,
  })
  availability_status: DriverAvailabilityStatus;
  @Column({ nullable: true }) work_area_id: string;
  @Column({ type: 'numeric', precision: 10, scale: 8, nullable: true }) current_latitude: number;
  @Column({ type: 'numeric', precision: 11, scale: 8, nullable: true }) current_longitude: number;
  @Column({ nullable: true }) last_location_update: Date;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at: Date;

  @OneToOne(() => User) @JoinColumn({ name: 'user_id' }) user: User;
}
