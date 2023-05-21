import styled from 'styled-components'

export const BudgetMetadataContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
`

export const StyledButton = styled.button`
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  background-color: green;
  padding: 10px;
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    background-color: #434052;
    transition: 600ms ease-in-out;
  }
`
