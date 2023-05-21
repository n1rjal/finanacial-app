import { AuthGuard } from '@libs/auth/auth.guard';
import { Controller, UseGuards, applyDecorators } from '@nestjs/common';

export const CustomController = (path: string) => {
  const decoratorsToApply = [UseGuards(AuthGuard), Controller(path)];
  return applyDecorators(...decoratorsToApply);
};
