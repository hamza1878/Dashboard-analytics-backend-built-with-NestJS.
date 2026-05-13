import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export enum UserRole { PASSENGER = 'passenger', DRIVER = 'driver', ADMIN = 'admin' }
export enum UserStatus { PENDING = 'pending', ACTIVE = 'active', SUSPENDED = 'suspended' }
export enum UserProvider { MANUAL = 'manual', GOOGLE = 'google', APPLE = 'apple' }

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) email: string;
  @Column({ nullable: true }) phone: string;
  @Column({ nullable: true, select: false }) password_hash: string;
  @Column({ length: 100 }) first_name: string;
  @Column({ length: 100 }) last_name: string;
  @Column({ nullable: true }) avatar_url: string;
  @Column({ default: false }) email_verified: boolean;
  @Column({ default: false }) phone_verified: boolean;
  @Column({ default: true }) is_active: boolean;
  @Column({ default: false }) is_banned: boolean;
  @Column({ nullable: true }) ban_reason: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.PASSENGER }) role: UserRole;
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING }) status: UserStatus;
  @Column({ type: 'enum', enum: UserProvider, default: UserProvider.MANUAL }) provider: UserProvider;
  @Column({ nullable: true }) agency_id: string;
  @Column({ default: false }) is_2fa_enabled: boolean;
  @Column({ default: false }) totp_enabled: boolean;
  @Column({ nullable: true }) last_login_at: Date;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at: Date;
}
