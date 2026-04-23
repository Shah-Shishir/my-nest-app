import { Test, TestingModule } from '@nestjs/testing';
import { MealCourseController } from './meal-course.controller';
import { MealCourseService } from './meal-course.service';

describe('MealCourseController', () => {
  let controller: MealCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealCourseController],
      providers: [MealCourseService],
    }).compile();

    controller = module.get<MealCourseController>(MealCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
