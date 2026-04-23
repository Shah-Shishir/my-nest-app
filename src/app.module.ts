import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule } from './tenant/tenant.module';
import { BranchModule } from './category/branch/branch.module';
import { CategoryModule } from './category/category.module';
import config from '../orm-config';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, TenantModule, BranchModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
