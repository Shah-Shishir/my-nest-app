import { Test, TestingModule } from '@nestjs/testing';
import { MealCourseService } from './meal-course.service';

describe('MealCourseService', () => {
  let service: MealCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealCourseService],
    }).compile();

    service = module.get<MealCourseService>(MealCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
