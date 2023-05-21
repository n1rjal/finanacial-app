import { PartitionEnum } from '@common/@types/enums/partition-enum';
import { SortEnum } from '@common/@types/enums/sort-type.enum';
import { BaseEntity } from '@common/database/base.entity';

type DateRange = [string, string];
type SortKey<T> = keyof T;
type PaginationObject = {
  skip: number;
  limit: number;
};

export class AggregationBuilder<T extends BaseEntity> {
  private pipelines: any = [];

  static buildTimePartition<T>(partition: PartitionEnum, key: keyof T) {
    const keyValue = key.toString().startsWith('$')
      ? key
      : `$${key.toString()}`;

    if (partition === PartitionEnum.MONTH)
      return {
        $month: { $toDate: keyValue },
      };

    if (partition === PartitionEnum.WEEKLY)
      return {
        $week: { $toDate: keyValue },
      };

    if (partition === PartitionEnum.YEAR)
      return {
        $year: { $toDate: keyValue },
      };
  }

  addGroupBy($groupArgs: any) {
    this.pipelines.push({
      $group: $groupArgs,
    });
    return this;
  }

  addFilterByDateRange([startDate, endDate]: DateRange) {
    this.pipelines.push({
      $match: {
        $and: [
          {
            expenseOn: {
              $gte: new Date(startDate).toISOString(),
            },
          },
          {
            expenseOn: {
              $lte: new Date(endDate).toISOString(),
            },
          },
        ],
      },
    });
    return this;
  }

  addFilterByKey(keyValue: unknown) {
    const matchQuery = Object.entries(keyValue).map((kv) => ({
      [kv[0]]: kv[1],
    }));
    this.pipelines.push({
      $match: {
        $and: matchQuery,
      },
    });
    return this;
  }

  addSortBy(
    args: { sortKey: string & Omit<string, SortKey<T>>; sortOrder: SortEnum }[],
  ) {
    for (const arg of args) {
      this.pipelines.push({
        $sort: {
          [arg.sortKey]: arg.sortOrder === SortEnum.ASCENDING ? 1 : -1,
        },
      });
    }
    return this;
  }

  addPagination(paginationArgs: PaginationObject) {
    this.pipelines.push(
      {
        $skip: Number(paginationArgs.skip) || 0,
      },
      {
        $limit: Number(paginationArgs.limit) || 10,
      },
    );
  }

  build() {
    return this.pipelines;
  }
}
