import { User } from '@entities/user.entity';
import { LoggedInUser } from '@common/decorators/user';
import { BudgetLogService } from './budget-log.service';
import { FetchBudgetLogDto } from './dto/fetch-budget-log.dto';
import { CreateBudgetLogDto } from './dto/create-budget-log.dto';
import { UpdateBudgetLogDto } from './dto/update-budget-log.dto';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CustomController } from '@common/decorators/custom-controller';

@CustomController('budget-logs')
export class BudgetLogController {
  constructor(private readonly budgetLogService: BudgetLogService) {}

  @Get()
  async getBudgetLogs(
    @LoggedInUser() user: User,
    @Query() fetchBudgetLogDto: FetchBudgetLogDto,
  ) {
    return this.budgetLogService.getBudgetLogs(user, fetchBudgetLogDto);
  }

  @Get('/:budgetLogId')
  async getOneBudgetLogs(
    @LoggedInUser() user: User,
    @Param('budgetLogId') budgetLogId: string,
  ) {
    return this.budgetLogService.getOneBudgetLog(budgetLogId, user);
  }

  @Post()
  async createBudgetLog(
    @LoggedInUser() user: User,
    @Body()
    createBudgetLogDto: CreateBudgetLogDto,
  ) {
    return this.budgetLogService.createBudgetLog(user, createBudgetLogDto);
  }

  @Put('/:id')
  async updateBudgetLog(
    @Param('id') budgetLogId: string,
    @LoggedInUser() user: User,
    @Body()
    updateBudgetLogDto: UpdateBudgetLogDto,
  ) {
    return this.budgetLogService.updateBudgetLog(
      budgetLogId,
      user,
      updateBudgetLogDto,
    );
  }

  @Delete('/:id')
  async deleteBudgetLog(
    @Param('id') budgetLogId: string,
    @LoggedInUser() user: User,
  ) {
    return this.budgetLogService.deleteBudgetLog(budgetLogId, user);
  }
}
