import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetLogDto } from './create-budget-log.dto';

export class UpdateBudgetLogDto extends PartialType(CreateBudgetLogDto) {}
