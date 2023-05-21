import { AxiosResponse } from 'axios'
import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { axiosInstance } from '../../constants/axios.instance'
import { ToastSuccessOptions } from '../../constants/toasts/toast-success'
import { UserProfileContext } from '../../context/UserProfileContext'
import {
  FormHeading,
  FormStyled,
  FormTitle,
} from '../EmailPasswordForm/form.styled'
import FormField from '../FormElement/FormElement'

interface IFormValues {
  type: string
  amount: number
  description: string
  expenseOn: string
  changeBudget: string | boolean
}

const BudgetEntryForm = () => {
  const contextData = useContext(UserProfileContext)
  const [formValues, setFormValues] = useState<IFormValues>({
    type: '',
    amount: 0,
    description: '',
    expenseOn: '',
    changeBudget: true,
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof IFormValues, string>>
  >({})

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post<IFormValues, AxiosResponse<unknown>>(
        '/budget-logs',
        {
          ...formValues,
          amount: Number(formValues.amount),
          expenseOn: new Date(formValues.expenseOn).toISOString(),
          type: formValues.type.toLowerCase(),
          changeBudget: formValues.changeBudget === 'TRUE',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${contextData.accessToken}`,
          },
        }
      )

      return res.data
    },
    onSuccess: () => {
      const values = formValues
      toast(`Form value added: ${values.amount} added `, ToastSuccessOptions)
    },
    onError: () => {},
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    console.log(e)
    const { name, value } = e.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const valid = validateForm()
    if (valid) return mutate()
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof IFormValues, string>> = {}

    if (!formValues.type) {
      newErrors.type = 'Type is required'
    }

    if (formValues.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!formValues.description) {
      newErrors.description = 'Description is required'
    }

    if (!formValues.expenseOn) {
      newErrors.expenseOn = 'Expense Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <>
      <FormHeading>
        <FormTitle>Welcome: {contextData.userProfile?.email}</FormTitle>
        <p>Use this form for interacting with your budget</p>
      </FormHeading>
      <div className="form-container">
        <FormStyled onSubmit={handleSubmit}>
          <div>
            <FormField
              type="select"
              label="Budget Type"
              name="type"
              value={formValues.type}
              choices={[
                { name: 'Budget', value: 'budget' },
                { name: 'Expense', value: 'expense' },
                { name: 'Income', value: 'income' },
                { name: 'Saving', value: 'saving' },
              ]}
              error={errors.type}
              onChange={handleChange}
            />

            <FormField
              type="text"
              label="Amount"
              name="amount"
              value={formValues.amount.toString()}
              error={errors.amount}
              onChange={handleChange}
            />

            <FormField
              type="date"
              label="Expense Date"
              name="expenseOn"
              value={formValues.expenseOn}
              error={errors.expenseOn}
              onChange={handleChange}
            />

            <FormField
              type="textarea"
              label="Description"
              name="description"
              value={formValues.description}
              error={errors.description}
              onChange={handleChange}
            />

            <FormField
              type="checkbox"
              label="Change Budget"
              name="changeBudget"
              value={formValues.changeBudget ? 'TRUE' : 'FALSE'}
              onChange={handleChange}
            />
          </div>
          <FormField
            type="submit"
            label="Submit Form"
            name="form"
            value="Create Budget Entry"
          />
        </FormStyled>
      </div>
    </>
  )
}

export default BudgetEntryForm
