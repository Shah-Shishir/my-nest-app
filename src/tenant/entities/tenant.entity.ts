import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Branch } from 'src/branch/entities/branch.entity';
import { MealCourse } from 'src/meal-course/entities/meal-course.entity';
import { Navigation } from 'src/navigation/entities/navigation.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tenant {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @Length(3, 10)
  name: string;

  @ApiProperty()
  @OneToMany(() => Navigation, (navigation) => navigation.tenant)
  navigations: Navigation[];

  @ApiProperty()
  @OneToMany(() => Subscription, (subscription) => subscription.tenant)
  subscriptions: Subscription[];

  @ApiProperty()
  @OneToMany(() => Branch, (branch) => branch.tenant)
  branches: Branch[];

  @ApiProperty()
  @OneToMany(() => MealCourse, (mealCourse) => mealCourse.tenant)
  mealCourses: MealCourse[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty()
  updatedAt: string;
}
