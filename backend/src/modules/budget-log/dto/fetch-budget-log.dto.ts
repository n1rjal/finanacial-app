import { BudgetLogType } from '@common/@types/enums/budget-type-logs.enum';
import { PartitionEnum } from '@common/@types/enums/partition-enum';
import { IsEnumField } from '@common/decorators/validators/IsEnumField';
import { BaseFetchDto } from '@common/dto/base-fetch.dto';
import { IsDateString, IsOptional } from 'class-validator';

export class FetchBudgetLogDto extends BaseFetchDto {
  @IsEnumField(BudgetLogType, {
    optional: true,
  })
  type: string;

  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString({})
  endDate: string;

  @IsEnumField(PartitionEnum, {
    optional: true,
  })
  partition: PartitionEnum;
}
