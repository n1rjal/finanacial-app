import { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { Navigate } from 'react-router-dom'
import EmailPasswordForm from '../components/EmailPasswordForm/EmailPasswordForm'
import { axiosInstance } from '../constants/axios.instance'
import { UserProfileContext } from '../context/UserProfileContext'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const data = useContext(UserProfileContext)

  const { status, mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post('/user/signup', { email, password })
      return res.data
    },
    mutationKey: 'signIn',
    onSuccess: (data: { accessToken: string }) => {
      localStorage.setItem('accessToken', data.accessToken)
    },
  })

  if (isSuccess) return <Navigate to="/" />
  if (data?.userProfile?.id) return <Navigate to="/" />

  return (
    <div>
      <EmailPasswordForm
        redirectUrl="/"
        submitDisabled={status === 'loading'}
        formTitle="Sign Up form"
        onSuccessMessage="Sign Up successful"
        description="Sign Up with your email and password"
        submitButtonValue="Sign Up"
        mutate={mutate}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  )
}

export default SignUp
