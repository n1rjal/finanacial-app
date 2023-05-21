import { createContext } from 'react'
import { UserProfileContextData } from '../@types/interface/user-profile.interface'
import { DEFAULT_USER_CONTEXT } from '../constants/defaults/user-context.default'

export const UserProfileContext =
  createContext<UserProfileContextData>(DEFAULT_USER_CONTEXT)
