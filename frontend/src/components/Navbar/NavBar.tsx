import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserProfileContext } from '../../context/UserProfileContext'
import { NavStyled } from './nav.styled'

const NavBar = () => {
  const contextData = useContext(UserProfileContext)

  return (
    <NavStyled>
      <div className="nav__links">
        <div>
          <Link to="/budget">List</Link>
        </div>
        <div>
          <Link to="/budget/create">Create</Link>
        </div>
      </div>

      <div className="user__info">
        <p>
          {contextData.isLoggedIn
            ? `Hello ${contextData.userProfile?.email}`
            : 'Not loggedIn'}
        </p>
        <p className="left__aligned">
          {contextData.isLoggedIn &&
            `$${contextData.userProfile?.metaData.expenseBudget} - ${
              contextData.userProfile!.metaData!.expenseBudget > 0
                ? 'Expense'
                : 'Loan'
            }`}
        </p>
      </div>
    </NavStyled>
  )
}

export default NavBar
