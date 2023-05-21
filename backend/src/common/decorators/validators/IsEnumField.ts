import { applyDecorators } from '@nestjs/common';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

interface IsEnumFieldOptions {
  each?: boolean;
  message?: string;
  optional?: boolean;
}

/**
 * It's a decorator that validates that the field is an enum value
 * @param {object} entity - object - The enum object to validate against.
 * @param {IsEnumFieldOptions} [ops] - IsEnumFieldOptions
 * @returns A decorator function that takes in a target, propertyKey, and descriptor.
 */
export const IsEnumField = (
  entity: object,
  options: IsEnumFieldOptions = {},
) => {
  const decoratorsToApply = [
    IsEnum(entity, {
      each: !!options.each,
      message: `must be a valid enum value: ${Object.values(entity).join(
        ', ',
      )}`,
    }),
  ];

  decoratorsToApply.push(
    IsNotEmpty({
      each: options.each,
    }),
  );

  if (options.each) {
    decoratorsToApply.push(ArrayNotEmpty({}));
  }

  if (options.optional) {
    decoratorsToApply.push(IsOptional());
  }

  if (options.each) {
    decoratorsToApply.push(IsArray({}));
  }

  return applyDecorators(...decoratorsToApply);
};
