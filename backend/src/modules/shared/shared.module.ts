import { Module } from '@nestjs/common';
import { BudgetLogModule } from '../budget-log/budget-log.module';
import { UserModule } from '../user/user.module';

export const USER_MODULES = [UserModule, BudgetLogModule];

@Module({
  imports: [...USER_MODULES],
  exports: [...USER_MODULES],
})
export class SharedModule {}
