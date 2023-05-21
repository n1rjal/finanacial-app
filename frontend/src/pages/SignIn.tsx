import { useMutation } from 'react-query'
import EmailPasswordForm from '../components/EmailPasswordForm/EmailPasswordForm'

import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { axiosInstance } from '../constants/axios.instance'
import { ToastFailureOptions } from '../constants/toasts/toast-error'
import { UserProfileContext } from '../context/UserProfileContext'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const data = useContext(UserProfileContext)

  const { status, mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post('/user/signin', { email, password })
      return res.data
    },
    mutationKey: 'signIn',
    onSuccess: ({ accessToken }: { accessToken: string }) => {
      localStorage.setItem('accessToken', accessToken)
      data.setIsLoggedIn(true)
    },
    onError: (error: any) => {
      const responseData = error.response.data
      toast(responseData.message, ToastFailureOptions)
    },
  })

  if (isSuccess) return <Navigate to="/" />
  if (data.isLoggedIn) return <Navigate to="/" />

  return (
    <div>
      <EmailPasswordForm
        submitDisabled={status === 'loading'}
        redirectUrl="/"
        formTitle="Sign In form"
        onSuccessMessage="Sign in successful"
        description="Sign in with your email and password"
        submitButtonValue="Sign In"
        mutate={mutate}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  )
}

export default SignIn
