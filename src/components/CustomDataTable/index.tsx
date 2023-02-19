import { paginationComponentOptions } from '../../utils/ReactDataTableConfigs'
import { StyledDataTable } from './styles'

interface ICustomDataTableProps {
  columns: []
  data: []
}

export function CustomDataTable({ columns, data }: ICustomDataTableProps) {
  return (
    <StyledDataTable
      pagination
      paginationComponentOptions={paginationComponentOptions}
      columns={columns}
      data={data}
    />
  )
}
