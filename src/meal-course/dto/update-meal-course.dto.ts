import { PartialType } from '@nestjs/swagger';
import { CreateMealCourseDto } from './create-meal-course.dto';

export class UpdateMealCourseDto extends PartialType(CreateMealCourseDto) {}
