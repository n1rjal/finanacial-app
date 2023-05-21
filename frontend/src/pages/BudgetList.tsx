import { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { BudgetLog } from '../@types/interface/budget-log.interface'
import BudgetEntryList from '../components/BudgetEntry/BudgetEntry'
import BudgetMetadata from '../components/BudgetMetadata/BudgetMetadata'
import Loader from '../components/Loader/Loader'
import { ContainerDiv } from '../components/styled/container.styled'
import { axiosInstance } from '../constants/axios.instance'
import { UserProfileContext } from '../context/UserProfileContext'

const BudgetList = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  })
  const [sort, setSort] = useState({
    sortKey: 'createdAt',
    sortOrder: 'DESC',
  })
  const [filter, setFilter] = useState({
    type: '',
    endDate: '',
    startDate: '',
  })

  const contextData = useContext(UserProfileContext)

  const { data, isLoading } = useQuery<BudgetLog[]>({
    queryKey: ['budgetLogs', pagination, sort, filter],
    queryFn: async () => {
      const params: any = {
        ...sort,
        ...filter,
        endDate: filter.endDate ? new Date(filter.endDate).toISOString() : '',
        startDate: filter.startDate
          ? new Date(filter.startDate).toISOString()
          : '',
        type: filter.type.toLowerCase(),
        limit: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit,
      }

      const queryString = Object.keys(params)
        .filter((key) => `${params[key]}` ?? false)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )

        .join('&')
      const res = await axiosInstance.get(`/budget-logs?${queryString}`, {
        headers: {
          Authorization: `Bearer ${contextData.accessToken}`,
        },
      })
      return res.data
    },
  })

  if (isLoading) return <Loader />

  return (
    <ContainerDiv>
      <BudgetMetadata
        pagination={pagination}
        setPagination={setPagination}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          gridGap: '3px',
        }}
      >
        {data!.map((entry) => (
          <BudgetEntryList data={entry} />
        ))}
      </div>
    </ContainerDiv>
  )
}

export default BudgetList
