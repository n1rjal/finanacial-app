import styled from 'styled-components'

export const FormTitle = styled.h1`
  font-size: 25px;
  margin: 0;
  text-transform: uppercase;
`

export const FormHeading = styled.div`
  margin: 20px 0;
  padding: 0;
  padding-bottom: 10px;
  text-align: left;
  p {
    font-size: 14px;
    text-align: left;
    padding: 0;
    margin: 0;
  }
`

export const FormStyled = styled.form`
  display: grid;
  grid-template-rows: auto auto;
  justify-content: center;
  align-items: center;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    align-items: center;
  }
`

export const FormElement = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  label {
    font-size: 16px;
    font-weight: bold;
  }

  input,
  select,
  textarea,
  button {
    background-color: #dbd7d7;
    ${(props) => (props.fullWidth ? 'width:100%;' : 'width:15vw;')}
    border: 1px solid black;
    padding: 10px;
    outline: none;
    padding-left: 10px;

    & :hover {
      background-color: #fff;
      transition: 600ms ease-in-out;
    }
  }

  input[type='submit'] {
    width: 2cm;
    height: 1cm;
    cursor: pointer;
    align-self: center;
    border-radius: 5px;
    text-transform: uppercase;
    ${(props) => (props.fullWidth ? 'width:100%;' : 'width:5cm;')}
  }
`
