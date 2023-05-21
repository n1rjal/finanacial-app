import styled from 'styled-components'

interface IHeaderProps {
  displayAfter: boolean
}

export const Header = styled.h2<IHeaderProps>`
  font-size: 20px;
  margin: 10px 0;
  display: block;
  position: relative;
  text-transform: uppercase;

  ${(props) =>
    props.displayAfter
      ? `&::after {
    content: '';
    display: block;
    width: 50px;
    border-top: 10px dotted red
  `
      : ''}
`
