import { UseMutateFunction, UseMutateAsyncFunction } from 'react-query'
import { ContainerDiv } from '../styled/container.styled'
import { FormElement, FormHeading, FormTitle } from './form.styled'

interface IFormProps {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  formTitle: string
  description: string
  redirectUrl: string
  submitButtonValue: string
  onSuccessMessage: string
  submitDisabled: boolean
  mutate:
    | UseMutateFunction<
        {
          accessToken: string
        },
        unknown,
        void,
        unknown
      >
    | UseMutateAsyncFunction<
        {
          accessToken: string
        },
        unknown,
        void,
        unknown
      >
}

const EmailPasswordForm = (props: IFormProps) => {
  return (
    <ContainerDiv>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          return props.mutate()
        }}
      >
        <FormHeading>
          <FormTitle>{props.formTitle}</FormTitle>
          <p>{props.description}</p>
        </FormHeading>

        <FormElement>
          <label>Email</label>
          <input
            required
            type="email"
            value={props.email}
            placeholder="Email"
            onChange={(e) => {
              props.setEmail(e.target.value)
            }}
          />
        </FormElement>

        <FormElement>
          <label>Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            value={props.password}
            onChange={(e) => {
              props.setPassword(e.target.value)
            }}
          />
        </FormElement>
        <FormElement>
          <input
            type="submit"
            disabled={props.submitDisabled}
            value={props.submitButtonValue}
          />
        </FormElement>
      </form>
    </ContainerDiv>
  )
}

export default EmailPasswordForm
