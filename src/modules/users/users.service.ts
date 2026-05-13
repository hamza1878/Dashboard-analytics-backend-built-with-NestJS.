import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll(role?: string) {
    const where: any = {};
    if (role) where.role = role;
    return this.repo.find({ where, order: { created_at: 'DESC' } });
  }

  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async ban(id: string, reason: string) {
    await this.repo.update(id, { is_banned: true, ban_reason: reason });
    return this.findOne(id);
  }

  async unban(id: string) {
    await this.repo.update(id, { is_banned: false, ban_reason: null });
    return this.findOne(id);
  }
}
