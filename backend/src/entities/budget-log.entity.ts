import { BudgetLogType } from '@common/@types/enums/budget-type-logs.enum';
import {
  Embeddable,
  Entity,
  Enum,
  ManyToOne,
  Property,
  Rel,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { BaseEntity } from '../common/database/base.entity';

@Embeddable()
export class SnapShot {
  @Property()
  income: string;

  @Property()
  expenseBudget: string;
}

@Entity({
  collection: 'budget-logs',
})
export class BudgetLog extends BaseEntity {
  @Property()
  amount: number;

  @Property()
  currentBudget: number;

  @Property()
  description: string;

  @ManyToOne(() => User)
  user: Rel<User>;

  @Enum(() => BudgetLogType)
  type: BudgetLogType;

  @Property({ onCreate: () => new Date() })
  expenseOn: string;
}
