import styled from 'styled-components'

export const WelcomeContainer = styled.div`
  padding: 10px;
`

export const WelcomeDescription = styled.div`
  font-size: 1rem;
`

export const WelcomeLinks = styled.div`
  display: grid;
  width: 100%;
  justify-content: space-between;
  grid-template-columns: auto auto;

  padding: 15px 0;
  grid-gap: 10px;

  div {
    margin: 10px 0;
    a {
      margin: 20px 0;
      text-decoration: none;
      border: 1px solid black;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      padding: 10px;
      background-color: #66f5ff;

      &:hover {
        transition: 600ms ease-in-out;
      }
    }
  }
`
