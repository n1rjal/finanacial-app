export interface UserProfileInterface {
  id: string
  isActive: boolean
  deletedAt: Date | null
  createdAt: Date
  email: string
  metaData: {
    incomeBudget: number
    savingBudget: number
    expenseBudget: number
    investment: number
    lowBudgetThreshold: number
  }
}

export interface UserProfileContextData {
  isLoggedIn: boolean
  accessToken: string | null
  userProfile: UserProfileInterface | null
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setAccessToken: (accessToken: string) => void
}
