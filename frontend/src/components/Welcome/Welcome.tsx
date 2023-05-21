import { Link } from 'react-router-dom'
import { ContainerDiv } from '../styled/container.styled'
import {
  WelcomeContainer,
  WelcomeDescription,
  WelcomeLinks,
} from './welcome.styled'
import { Header } from '../styled/header.styled'

const Welcome = () => {
  return (
    <ContainerDiv>
      <WelcomeContainer>
        <Header displayAfter={true}>Welcome to finance app</Header>
        <WelcomeDescription>
          You might want to get started To get started, You can Sign In or Sign
          Up using any of the button provided below.
        </WelcomeDescription>
        <WelcomeDescription>
          You can use any of the links provided
        </WelcomeDescription>
        <WelcomeLinks>
          <div>
            <Link to="/auth/signup">Sign Up</Link>
          </div>
          <div>
            <Link to="/auth/signin">Sign In</Link>
          </div>
        </WelcomeLinks>
      </WelcomeContainer>
    </ContainerDiv>
  )
}

export default Welcome
