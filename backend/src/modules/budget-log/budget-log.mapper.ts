import { User } from '@entities/user.entity';
import { FetchBudgetLogDto } from './dto/fetch-budget-log.dto';
import { BudgetLogType } from '@common/@types/enums/budget-type-logs.enum';

export const BudgetLogMapper = {
  /* The `mapToBudgetLogDtoToFilters` function takes in a `FetchBudgetLogDto` object and maps it to a
  filter object that can be used to query the database for budget logs. It checks if the `startDate`
  and `endDate` properties are present in the `dto` object, and if so, it creates a filter object
  with a `expenseOn` property that specifies a range between the `startDate` and `endDate`. If the
  `type` property is present in the `dto` object, it adds a `type` property to the filter object
  with the value of `dto.type`. The function then returns the filter object. */
  mapToBudgetLogDtoToFilters(dto: FetchBudgetLogDto) {
    const filtersToApply = {};

    if (dto.startDate && dto.endDate)
      filtersToApply['expenseOn'] = {
        $gte: dto.startDate,
        $lte: dto.endDate,
      };

    if (dto.type) filtersToApply['type'] = dto.type;

    return filtersToApply;
  },

  /* The `handleBudgetChange` function takes in a `User` object, a `BudgetLogType` enum value, and an
  `amount` number. It then updates the `User` object's `metaData` property based on the
  `BudgetLogType` value and the `amount`. This performs financial transactions*/
  handleBudgetChange(user: User, type: BudgetLogType, amount: number) {
    if (type === BudgetLogType.EXPENSE) user.metaData.expenseBudget -= amount;
    if (type === BudgetLogType.INCOME) user.metaData.incomeBudget += amount;
    if (type === BudgetLogType.SAVING) user.metaData.savingBudget += amount;
    if (type === BudgetLogType.BUDGET) user.metaData.expenseBudget += amount;
    return user;
  },
};
