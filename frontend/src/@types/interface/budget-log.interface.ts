export interface BudgetLog {
  _id: string
  isActive: boolean
  isDeleted: boolean
  deletedAt: null | string
  createdAt: string
  updatedAt: string
  amount: number
  currentBudget: number
  description: string
  user: string
  type: 'budget' | 'expense' | 'income' | 'saving'
  expenseOn: string
}
