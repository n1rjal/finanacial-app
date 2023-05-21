import { FormElement } from '../EmailPasswordForm/form.styled'

interface IOptionType {
  name: string
  value: string
  selected?: boolean
}

interface IFormFieldProps<T> {
  label: string
  name: KeyAsString<keyof T>
  value: string | number
  choices?: IOptionType[]
  error?: string
  type: React.HTMLInputTypeAttribute | 'textarea' | 'select'
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
}

type KeyAsString<T> = keyof T extends string ? string : string

const FormField = <T,>({
  label,
  name,
  choices,
  value,
  error,
  type,
  onChange,
}: IFormFieldProps<T>) => (
  <FormElement fullWidth={false}>
    {type !== 'submit' && (
      <>
        <label>{label}:</label>
      </>
    )}
    {type === 'select' && choices && choices.length > 0 ? (
      <select name={name} value={value} onChange={onChange}>
        <option>Select any value</option>
        {choices.map((choice) => (
          <option
            value={choice.name}
            key={choice.value}
            selected={!!choice.selected}
          >
            {choice.value}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea name={name} value={value} onChange={onChange} />
    ) : type === 'submit' ? (
      <input type={'submit'} value={value} />
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} />
    )}
    {error && <span className="error">{error}</span>}
  </FormElement>
)

export default FormField
