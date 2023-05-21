import { useContext } from 'react'
import { UserProfileContext } from '../../context/UserProfileContext'
import { BudgetMetadataContainer, StyledButton } from './budget-metadata.styled'
import FormField from '../FormElement/FormElement'

interface IBudgetMetadata {
  filter: {
    type: string
    endDate: string
    startDate: string
  }
  sort: {
    sortKey: string
    sortOrder: string
  }
  setSort: React.Dispatch<
    React.SetStateAction<{
      sortKey: string
      sortOrder: string
    }>
  >
  setFilter: React.Dispatch<
    React.SetStateAction<{
      type: string
      endDate: string
      startDate: string
    }>
  >
  pagination: {
    page: number
    limit: number
  }
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number
      limit: number
    }>
  >
}

const BudgetMetadata = (props: IBudgetMetadata) => {
  const contextData = useContext(UserProfileContext)

  return (
    <div>
      <BudgetMetadataContainer>
        <div className="metadata">
          <StyledButton
            onClick={(e) => {
              props.setFilter({
                ...props.filter,
                type: 'expense',
              })
            }}
          >
            Expenses: ${contextData.userProfile?.metaData.expenseBudget}
          </StyledButton>

          <StyledButton
            onClick={(e) => {
              props.setFilter({
                ...props.filter,
                type: 'income',
              })
            }}
          >
            Incomes: ${contextData.userProfile?.metaData.incomeBudget}
          </StyledButton>
          <StyledButton
            onClick={(e) => {
              props.setFilter({
                ...props.filter,
                type: 'saving',
              })
            }}
          >
            Savings: ${contextData.userProfile?.metaData.savingBudget}
          </StyledButton>
          <StyledButton
            onClick={(e) => {
              props.setFilter({
                ...props.filter,
                type: 'investment',
              })
            }}
          >
            Investments: ${contextData.userProfile?.metaData.investment}
          </StyledButton>
        </div>
      </BudgetMetadataContainer>
      <BudgetMetadataContainer>
        <FormField
          label="Start Date"
          name="startDate"
          value={props.filter.startDate}
          onChange={(e) => {
            props.setFilter({
              ...props.filter,
              startDate: new Date(e.target.value).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
            })
          }}
          type="date"
        />
        <FormField
          label="End Date"
          name="endDate"
          value={props.filter.endDate}
          onChange={(e) => {
            props.setFilter({
              ...props.filter,
              endDate: new Date(e.target.value).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
            })
          }}
          type="date"
        />
        <FormField
          label="Page"
          name="page"
          value={props.pagination.page}
          type="select"
          onChange={(e) => {
            props.setPagination({
              ...props.pagination,
              page: Number(e.target.value) ?? props.pagination.limit,
            })
          }}
          choices={[0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
            name: num.toString(),
            value: num.toString(),
          }))}
        />
        <FormField
          label="Per Page"
          name="limit"
          value={props.pagination.limit}
          type="select"
          onChange={(e) => {
            props.setPagination({
              ...props.pagination,
              limit: Number(e.target.value) ?? props.pagination.limit,
            })
          }}
          choices={[0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
            name: (num * 10).toString(),
            value: (num * 10).toString(),
          }))}
        />
      </BudgetMetadataContainer>
    </div>
  )
}

export default BudgetMetadata
