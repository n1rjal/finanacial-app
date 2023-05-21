import { Module } from '@nestjs/common';
import { BudgetLogController } from './budget-log.controller';
import { BudgetLogService } from './budget-log.service';

@Module({
  controllers: [BudgetLogController],
  providers: [BudgetLogService],
})
export class BudgetLogModule {}
