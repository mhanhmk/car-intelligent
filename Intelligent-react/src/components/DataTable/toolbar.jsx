/* eslint-disable react/prop-types */
import { X, PlusCircle } from 'lucide-react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DataTableViewOptions } from './view-options'

import { options } from './data/data'
import { DataTableFacetedFilter } from './faceted-filter'

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>
// }

export function DataTableToolbar({ table, filters, inputFilterName }) {
  const isFiltered = table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {inputFilterName && (
          <Input
            placeholder={`Filter ${inputFilterName}...`}
            value={table.getColumn(inputFilterName)?.getFilterValue() ?? ''}
            onChange={event => table.getColumn(inputFilterName)?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {filters.map(
          ({ accessorKey, title }) =>
            table.getColumn(accessorKey) && (
              <DataTableFacetedFilter
                key={accessorKey}
                column={table.getColumn(accessorKey)}
                title={title}
                options={options[accessorKey]}
              />
            )
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}

        <Button className="h-8 ml-9" onClick={() => table.options.meta?.addData()}>
          <PlusCircle className="h-5 w-5 mr-2" />
          添加
        </Button>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
