import {
  BeforeCreate,
  BeforeUpdate,
  BeforeUpsert,
  Embeddable,
  Embedded,
  Entity,
  EventArgs,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../common/database/base.entity';
import { HelperService } from '@common/helpers/helpers.utils';

@Embeddable()
export class UserMetadata {
  @Property()
  incomeBudget: number;

  @Property()
  savingBudget: number;

  @Property()
  expenseBudget: number;

  @Property()
  investment: number;

  @Property()
  lowBudgetThreshold: number;
}

@Entity({
  collection: 'users',
})
export class User extends BaseEntity {
  @Property()
  email: string;

  @Property({ hidden: true })
  password: string;

  @Embedded(() => UserMetadata)
  metaData: UserMetadata;

  @BeforeCreate()
  @BeforeUpdate()
  @BeforeUpsert()
  async hashPassword(arguments_: EventArgs<this>) {
    if (arguments_.changeSet?.payload?.password) {
      this.password = await HelperService.hashString(this.password);
    }
  }
}
