import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ILike, Like, Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantQueryDto } from './dto/tenant-query.dto';
import { PaginatedTenantResponseDto } from './dto/paginated-tenant-response.dto';
import { Constants } from 'src/shared/constants';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const name = createTenantDto.name.trim();
    const existing = await this.tenantRepository.findOne({
      where: { name: Like(name) },
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

  async findAll(query: TenantQueryDto): Promise<PaginatedTenantResponseDto> {
    const page = query.currentPage ?? 1;
    const limit = query.pageSize ?? 10;
    const search = query.search?.trim();

    const where = search ? { name: ILike(`%${search}%`) } : {};
    const skip = (page - 1) * limit;

    const [data, totalCount] = await this.tenantRepository.findAndCount({
      where, // Search Query
      take: limit, // Page Size
      skip, // Data to skip
      order: {
        [query.sortBy ?? Constants.DEFAULT_SORT_KEY]:
          query.sortOrder ?? Constants.ASCENDING,
      }, // Sort Order
    });

    return { data, totalCount, page, limit };
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
      where: { name: Like(name) },
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
