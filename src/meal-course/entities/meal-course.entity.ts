import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class MealCourse {
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

  @ManyToOne(() => Tenant, (tenant) => tenant.mealCourses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;
}
