import { ApiProperty } from '@nestjs/swagger';
import { Tenant } from '../entities/tenant.entity';

export class PaginatedTenantResponseDto {
  @ApiProperty({ type: Tenant, isArray: true })
  data: Tenant[];

  @ApiProperty({ example: 42 })
  totalCount: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}

