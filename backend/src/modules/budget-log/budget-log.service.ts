import { BaseRepository } from '@common/database/base.repository';
import { BudgetLog } from '@entities/budget-log.entity';
import { User } from '@entities/user.entity';
import { PopulateHint } from '@mikro-orm/core';
import { EntityManager, ObjectId } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AggregationBuilder } from './aggregation/budget-log-aggregation.builder';
import { BudgetLogMapper } from './budget-log.mapper';
import { CreateBudgetLogDto } from './dto/create-budget-log.dto';
import { FetchBudgetLogDto } from './dto/fetch-budget-log.dto';
import { UpdateBudgetLogDto } from './dto/update-budget-log.dto';

@Injectable()
export class BudgetLogService {
  constructor(
    @InjectRepository(BudgetLog)
    private readonly budgetLogRepository: BaseRepository<BudgetLog>,

    private readonly em: EntityManager,
  ) {}

  /**
   * This function retrieves budget logs based on user and optional filters.
   * @param {User} user - The user object represents the user for whom the budget logs are being
   * fetched.
   * @param {FetchBudgetLogDto} fetchBudgetLogDto - FetchBudgetLogDto is a data transfer object (DTO)
   * that contains filters and options for fetching budget logs. It may contain a "type" property to
   * filter logs by type, and it has a method called "getFindOptions()" that returns an object with
   * options for the find() method of the
   * @returns A Promise that resolves to an array of BudgetLog objects.
   */
  async getBudgetLogs(
    user: User,
    {
      endDate,
      startDate,
      type,
      limit,
      skip,
      sortKey,
      sortOrder,
      partition,
    }: FetchBudgetLogDto,
  ): Promise<BudgetLog[]> {
    const aggregationBuilder = new AggregationBuilder<BudgetLog>();
    if (startDate && endDate)
      aggregationBuilder.addFilterByDateRange([startDate, endDate]);
    if (type)
      aggregationBuilder.addFilterByKey({
        type,
        user: new ObjectId(user.id),
      });
    if (sortKey && sortOrder)
      aggregationBuilder.addSortBy([
        {
          sortKey,
          sortOrder,
        },
      ]);

    if (partition && type && type !== 'day')
      aggregationBuilder.addGroupBy({
        _id: AggregationBuilder.buildTimePartition<BudgetLog>(
          partition,
          'expenseOn',
        ),
        [`maxExpenseOn`]: { $max: '$expenseOn' },
        [`minExpenseOn`]: { $min: '$expenseOn' },
        [`max${type}`]: { $max: '$amount' },
        [`min${type}`]: { $min: '$amount' },
        [`total${type}`]: { $sum: '$amount' },
      });
    if (skip && limit)
      aggregationBuilder.addPagination({
        limit,
        skip,
      });

    const pipelines = aggregationBuilder.build();
    return await this.em.aggregate(BudgetLog, pipelines);
  }

  /**
   * This function retrieves a single budget log for a given user by its ID.
   * @param {string} budgetLogId - A string representing the unique identifier of a budget log.
   * @param {User} user - The `user` parameter is an instance of the `User` class, which represents the
   * user who is requesting the budget log. It is used to ensure that the budget log being retrieved
   * belongs to the correct user.
   * @returns This function returns a Promise that resolves to a BudgetLog object. The BudgetLog object
   * is retrieved from the budgetLogRepository based on the provided budgetLogId and user. If the
   * BudgetLog object is not found, an error is thrown.
   */
  async getOneBudgetLog(budgetLogId: string, user: User): Promise<BudgetLog> {
    const budgetLog = await this.budgetLogRepository.findOne(
      { id: budgetLogId, user },
      {
        populateWhere: PopulateHint.ALL,
      },
    );
    if (!budgetLog) throw new Error('Budget log not found');
    return budgetLog;
  }

  /**
   * This function creates a budget log for a user with a specified amount and type.
   * @param {User} user - User object representing the user who created the budget log.
   * @param {CreateBudgetLogDto} - `user`: an instance of the `User` class representing the user who
   * created the budget log
   * @returns The `createBudgetLog` function returns a Promise that resolves to a `BudgetLog` object.
   */
  async createBudgetLog(
    user: User,
    { changeBudget, ...createBudgetLogDto }: CreateBudgetLogDto,
  ): Promise<BudgetLog> {
    return this.em.transactional(async (em) => {
      const { metaData: newUserMetadata } = BudgetLogMapper.handleBudgetChange(
        user,
        createBudgetLogDto.type,
        createBudgetLogDto.amount,
      );
      const budgetLog = em.create(BudgetLog, {
        ...createBudgetLogDto,
        user,
        currentBudget: changeBudget
          ? newUserMetadata.expenseBudget
          : user.metaData.expenseBudget,
      });
      if (!changeBudget) {
        await em.persistAndFlush([budgetLog, user]);
        return budgetLog;
      } else {
        em.assign(user, { metaData: newUserMetadata });
        await em.persistAndFlush([budgetLog, user]);
        return budgetLog;
      }
    });
  }

  /**
   * This function updates a budget log with the provided data and returns the updated budget log.
   * @param {string} _id - The ID of the budget log that needs to be updated.
   * @param {UpdateBudgetLogDto} updateBudgetLogDto - UpdateBudgetLogDto is a data transfer object that
   * contains the updated information for a budget log. It is used to update the properties of an
   * existing budget log in the database.
   * @returns a Promise that resolves to a BudgetLog object.
   */
  async updateBudgetLog(
    _id: string,
    user: User,
    updateBudgetLogDto: UpdateBudgetLogDto,
  ): Promise<BudgetLog> {
    const budgetLog = await this.getOneBudgetLog(_id, user);
    this.budgetLogRepository.assign(budgetLog, updateBudgetLogDto);
    await this.em.persistAndFlush(budgetLog);
    return budgetLog;
  }

  /**
   * This function deletes a budget log from the database using its ID.
   * @param {string} id - The _id parameter is a string that represents the unique identifier of a
   * budget log that needs to be deleted.
   * @returns a Promise that resolves to a BudgetLog object.
   */
  async deleteBudgetLog(id: string, user: User): Promise<BudgetLog> {
    const budgetLog = await this.getOneBudgetLog(id, user);
    if (!budgetLog) throw new Error('Budget log not found');
    this.budgetLogRepository.softRemoveAndFlush(budgetLog);
    return budgetLog;
  }
}
