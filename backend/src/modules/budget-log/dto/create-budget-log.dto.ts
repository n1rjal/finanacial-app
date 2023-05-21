import { BudgetLogType } from '@common/@types/enums/budget-type-logs.enum';
import { IsEnumField } from '@common/decorators/validators/IsEnumField';
import { IsNumberField } from '@common/decorators/validators/IsNumberField';
import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreateBudgetLogDto {
  @IsEnumField(BudgetLogType, {
    optional: true,
  })
  type: BudgetLogType;

  @IsNumberField({
    max: 1000000,
    min: 0,
  })
  amount: number;

  @IsString()
  description: string;

  @IsDateString()
  expenseOn: string;

  @IsBoolean()
  changeBudget: boolean;
}
