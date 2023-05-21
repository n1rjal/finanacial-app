import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Welcome from '../components/Welcome/Welcome'
import { UserProfileContext } from '../context/UserProfileContext'

const Home = () => {
  const contextData = useContext(UserProfileContext)

  if (contextData.isLoggedIn) return <Navigate to="/budget/create" />
  return <Welcome />
}

export default Home
