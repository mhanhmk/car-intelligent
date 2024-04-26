import { Checkbox } from '../../../components/ui/checkbox'
import { DataTableColumnHeader, DataTableRowActions } from '../../../components/DataTable'
import { getColumnsModel } from './columns'
import { getTaskSchema } from './schema'

const select = {
  id: 'select',
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-[2px]"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={value => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  ),
  enableSorting: false,
  enableHiding: false,
}

const actions = taskSchema => {
  return {
    id: 'actions',
    cell: ({ row, table }) => (
      <DataTableRowActions
        row={row}
        onEdit={table.options.meta?.editData}
        onDelete={table.options.meta?.deleteData}
        taskSchema={taskSchema}
      />
    ),
  }
}

const oneColumns = ({
  accessorKey,
  title = null,
  enableSorting = false,
  enableHiding = true,
  cell = null,
  filterFn = null,
} = {}) => {
  return {
    accessorKey: accessorKey,
    header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
    cell: cell ? cell : ({ row }) => <div className="max-w-[200px] truncate">{row.getValue(accessorKey)}</div>,
    enableSorting,
    enableHiding,
    ...(filterFn && { filterFn }),
  }
}

export const getColumns = tableName => {
  let lastColumns = [select]
  getColumnsModel(tableName).map(item => {
    lastColumns.push(oneColumns(item))
  })
  lastColumns.push(actions(getTaskSchema(tableName)))
  return lastColumns
}

export const getFilters = tableName => {
  let filterList = []
  getColumnsModel(tableName).map(item => {
    if ('filterFn' in item) {
      filterList.push({ accessorKey: item.accessorKey, title: item.title })
    }
  })

  return filterList
}
