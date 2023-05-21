import { IsNumberField } from '@common/decorators/validators/IsNumberField';
import { SignUpUserDto } from './signup-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(SignUpUserDto) {
  @IsNumberField({
    min: 5,
    max: 100,
    optional: true,
  })
  lowBudgetThreshold: number;
}
