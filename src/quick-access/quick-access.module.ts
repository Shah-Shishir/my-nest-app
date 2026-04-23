import { Module } from '@nestjs/common';
import { QuickAccessService } from './quick-access.service';
import { QuickAccessController } from './quick-access.controller';

@Module({
  controllers: [QuickAccessController],
  providers: [QuickAccessService],
})
export class QuickAccessModule {}
