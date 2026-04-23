import { Module } from '@nestjs/common';
import { MealCourseService } from './meal-course.service';
import { MealCourseController } from './meal-course.controller';

@Module({
  controllers: [MealCourseController],
  providers: [MealCourseService],
})
export class MealCourseModule {}
