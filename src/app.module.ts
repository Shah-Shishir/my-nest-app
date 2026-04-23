import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule } from './tenant/tenant.module';
import { BranchModule } from './branch/branch.module';
import { CategoryModule } from './category/category.module';
import { MealCourseModule } from './meal-course/meal-course.module';
import { QuickAccessModule } from './quick-access/quick-access.module';
import { TaxModule } from './tax/tax.module';
import { FoodItemModule } from './food-item/food-item.module';
import { PaymentModule } from './payment/payment.module';
import config from '../orm-config';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, TenantModule, BranchModule, CategoryModule, MealCourseModule, QuickAccessModule, TaxModule, FoodItemModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
