import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Branch {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @Length(3, 10)
  name: string;

  @ApiProperty()
  @Column('uuid')
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.branches, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;
}
