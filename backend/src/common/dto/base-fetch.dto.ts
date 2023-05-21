import { SortEnum } from '@common/@types/enums/sort-type.enum';
import { IsEnumField } from '@common/decorators/validators/IsEnumField';
import { IsNumberField } from '@common/decorators/validators/IsNumberField';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class BaseFetchDto {
  @Type(() => Number)
  @IsNumberField({
    max: 1000,
    min: 1,
    optional: true,
  })
  limit = 10;

  @Type(() => Number)
  @IsNumberField({
    max: 1000,
    min: 0,
    optional: true,
  })
  skip = 0;

  @IsString()
  sortKey: string;

  @IsEnumField(SortEnum)
  sortOrder: SortEnum;
}
