import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TenantQueryDto } from './dto/tenant-query.dto';
import { PaginatedTenantResponseDto } from './dto/paginated-tenant-response.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @ApiCreatedResponse({ type: Tenant })
  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @ApiOkResponse({ type: PaginatedTenantResponseDto })
  @Get()
  findAll(@Query() query: TenantQueryDto) {
    return this.tenantService.findAll(query);
  }

  @ApiOkResponse({ type: Tenant })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @ApiOkResponse({ type: Tenant })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @ApiOkResponse({ type: Tenant })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
