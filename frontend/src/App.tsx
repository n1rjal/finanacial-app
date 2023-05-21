import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import { GlobalFlex } from './components/styled/global-flex.styled'
import { UserProfileProvider } from './context/UserProfileProvider'
import GlobalStyle from './global.styled'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import BudgetCreate from './pages/BudgetCreate'
import NavBar from './components/Navbar/NavBar'
import BudgetList from './pages/BudgetList'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProfileProvider>
          <BrowserRouter>
            <GlobalStyle />
            <NavBar />
            <div className="App">
              <GlobalFlex>
                <Routes>
                  <Route path="" element={<Home />} />
                  <Route
                    path="/auth/signUp"
                    caseSensitive={false}
                    element={<SignUp />}
                  />
                  <Route
                    path="/auth/signUp"
                    caseSensitive={false}
                    element={<SignUp />}
                  />
                  <Route
                    path="/auth/signIn"
                    caseSensitive={false}
                    element={<SignIn />}
                  />
                  <Route
                    path="/budget/create"
                    caseSensitive={false}
                    element={<BudgetCreate />}
                  />
                  <Route
                    path="/budget"
                    caseSensitive={false}
                    element={<BudgetList />}
                  />
                </Routes>
              </GlobalFlex>
              <Toaster />
            </div>
          </BrowserRouter>
        </UserProfileProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
