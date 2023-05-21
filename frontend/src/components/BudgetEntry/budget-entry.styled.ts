import { styled } from 'styled-components'

export const StyledBudgetContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-start;
  justify-items: center;
  align-items: center;
  column-gap: 10px;
  width: 7cm;
  padding: 10px;
  border: 1px solid;
  background-color: azure;

  div.description {
    display: grid;
    padding: 15px 0;
    grid-template-columns: auto auto;
    justify-content: space-between;
    width: 100%;
  }
`
