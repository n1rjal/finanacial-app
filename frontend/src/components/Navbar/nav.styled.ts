import styled from 'styled-components'

export const NavStyled = styled.nav`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  position: fixed;
  width: 100vw;
  background-color: #002;
  color: #eee;
  font-size: 20px;

  & div.nav__links {
    display: grid;
    justify-content: flex-start;
    grid-template-columns: 1fr 1fr;

    div {
      padding: 15px 0;

      a {
        text-decoration: none;
        color: #eee;
        padding: 0 10px;
      }

      &:hover {
        background-color: #533eb5;
        transition: 600ms ease-in-out;
      }
    }
  }

  & div.user__info {
    display: grid;
    align-items: center;
    justify-content: center;
    justify-content: flex-end;
    p.left__aligned {
      float: left;
    }
  }
`
