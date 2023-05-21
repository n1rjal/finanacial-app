import { Entity, JsonType, Property, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../common/database/base.entity';
import { User } from './user.entity';

@Entity({
  collection: 'notifications',
})
export class Notification extends BaseEntity {
  @Property()
  isReminder: boolean;

  @Property()
  title: string;

  @Property()
  message: string;

  @Property()
  user: Rel<User>;

  @Property({
    type: JsonType,
  })
  data: Record<string, string> = {};
}
