import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ILike, Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const name = createTenantDto.name.trim();
    const existing = await this.tenantRepository.findOne({
      where: { name: ILike(name) },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Tenant name already exists');
    }

    const newTenant = this.tenantRepository.create({
      name,
    }); 

    try {
      return await this.tenantRepository.save(newTenant);
    } catch (e: any) {
      // Safety net for concurrent requests that bypass the pre-check.
      if (e?.code === '23505') {
        throw new ConflictException('Tenant name already exists');
      }
      throw e;
    }
  }

  findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    try {
      const tenant = await this.tenantRepository.findOneByOrFail({ id });
      return tenant;
    } catch (err) {
      throw new NotFoundException('Tenant not found');
    }
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);
    const name = (updateTenantDto.name ?? '').trim();
    const existing = await this.tenantRepository.findOne({
      where: { name: ILike(name) },
      select: { id: true },
    });

    if (existing && existing.id !== id) {
      throw new ConflictException('Tenant name already exists');
    }

    tenant.name = name;

    try {
      return await this.tenantRepository.save(tenant);
    } catch (e: any) {
      if (e?.code === '23505') {
        throw new ConflictException('Tenant name already exists');
      }
      throw e;
    }
  }

  async remove(id: string): Promise<Tenant> {
    const tenant = await this.findOne(id);
    return this.tenantRepository.remove(tenant);
  }
}
