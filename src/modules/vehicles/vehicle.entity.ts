import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export enum VehicleStatus { PENDING = 'Pending', APPROVED = 'Approved', REJECTED = 'Rejected', SUSPENDED = 'Suspended' }

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ nullable: true }) driver_id: string;
  @Column({ nullable: true }) agency_id: string;
  @Column({ length: 50 }) make: string;
  @Column({ length: 50 }) model: string;
  @Column() year: number;
  @Column({ length: 30, nullable: true }) color: string;
  @Column({ length: 20, nullable: true, unique: true }) license_plate: string;
  @Column({ length: 17, nullable: true, unique: true }) vin: string;
  @Column({ nullable: true }) registration_document_url: string;
  @Column({ type: 'date', nullable: true }) registration_expiry: string;
  @Column({ nullable: true }) insurance_document_url: string;
  @Column({ type: 'date', nullable: true }) insurance_expiry: string;
  @Column({ nullable: true }) technical_control_url: string;
  @Column({ type: 'date', nullable: true }) technical_control_expiry: string;
  @Column({ type: 'jsonb', nullable: true }) photos: object;
  @Column({ type: 'enum', enum: VehicleStatus, default: VehicleStatus.PENDING }) status: VehicleStatus;
  @Column({ nullable: true }) verified_at: Date;
  @Column({ default: true }) is_active: boolean;
  @Column() class_id: string;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at: Date;
}
