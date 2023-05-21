import { useQuery } from 'react-query'
import { UserProfileInterface } from '../@types/interface/user-profile.interface'
import Loader from '../components/Loader/Loader'
import { axiosInstance } from '../constants/axios.instance'
import useLocalStorage from '../hooks/useLocalStorage'
import { UserProfileContext } from './UserProfileContext'
import { useState } from 'react'

interface UserProfileProviderProps {
  children: React.ReactNode
}

export const UserProfileProvider = (props: UserProfileProviderProps) => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    'accessToken',
    null
  )
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const { isLoading, data: userData } = useQuery<UserProfileInterface | null>(
    'userProfile',
    async () => {
      if (!accessToken) return null
      const res = await axiosInstance.get<UserProfileInterface>(
        '/user/profile',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setIsLoggedIn(true)
      return res.data
    },
    {
      onSuccess: (userData) => {
        return userData
      },

      onError: (err: any) => {
        return null
      },
    }
  )

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <UserProfileContext.Provider
          value={{
            isLoggedIn,
            accessToken: accessToken,
            setIsLoggedIn: setIsLoggedIn,
            userProfile: userData ?? null,
            setAccessToken: setAccessToken,
          }}
        >
          {props.children}
        </UserProfileContext.Provider>
      )}
    </div>
  )
}
