import { BudgetLog } from '../../@types/interface/budget-log.interface'
import { StyledBudgetContainer } from './budget-entry.styled'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

interface IBudgetEntryProps {
  data: BudgetLog
}

const BudgetEntryList = (props: IBudgetEntryProps) => {
  return (
    <div>
      <StyledBudgetContainer>
        <div>
          {props.data.type === 'budget' ? (
            <AiOutlineArrowUp
              style={{
                fontSize: '40px',
                color: 'green',
                backgroundColor: '#f2f2f2',
              }}
            />
          ) : (
            <AiOutlineArrowDown
              style={{
                fontSize: '40px',
                color: 'red',
                backgroundColor: '#e6e6e6',
              }}
            />
          )}
        </div>
        <div className="budget__entry__info">
          <p>
            {new Date(props.data.expenseOn).toLocaleDateString()} -
            {props.data.description}
          </p>
          <p>
            ${props.data.amount} {props.data.type}
          </p>
        </div>
      </StyledBudgetContainer>
    </div>
  )
}

export default BudgetEntryList
