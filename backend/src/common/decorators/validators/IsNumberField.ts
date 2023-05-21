import { applyDecorators } from '@nestjs/common';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

interface IsNumberFieldOptions {
  each?: boolean;
  message?: string;
  optional?: boolean;
  max: number;
  min: number;
}

export const IsNumberField = (options: IsNumberFieldOptions) => {
  const decoratorsToApply = [IsNumber({})];
  if (options.max)
    decoratorsToApply.push(
      Max(options.max, {
        each: options.each,
      }),
    );
  if (options.min)
    decoratorsToApply.push(
      Min(options.min, {
        each: options.each,
      }),
    );
  if (options.optional) decoratorsToApply.push(IsOptional());
  return applyDecorators(...decoratorsToApply);
};
