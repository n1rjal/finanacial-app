import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

export abstract class BaseEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string; // won't be saved in the database
  /**
   *  To enable or disable the entity
   */
  @Property()
  isActive = true;

  /**
   *  Marked true when entity is soft deleted
   */
  @Property({ hidden: true })
  isDeleted = false;

  /**
   *  The date that the entity was soft-deleted. Nullable because it's not set until the entity is soft-deleted.
   */
  @Property({
    nullable: true,
  })
  deletedAt?: Date | null = null;

  /**
   *  The date that the entity was created
   */
  @Property()
  createdAt = new Date();

  /**
   *  The date that the entity was last updated
   */
  @Property({
    onUpdate: () => new Date(),
    hidden: true,
  })
  updatedAt? = new Date();
}
