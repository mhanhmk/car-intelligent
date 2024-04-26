/* eslint-disable react/prop-types */
import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
// import { z } from 'zod'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { DataTablePagination } from '../../components/DataTable/pagination'
import { DataTableToolbar } from '../../components/DataTable/toolbar'
import { getColumnsModel } from './data/columns'
import { getColumns, getFilters } from './data/columns-parse'
import sendRequest from '../../plugins/axios'
import { EditInfo } from './EditInfo'
import { useToast } from '../../components/ui/use-toast'
import { handleResponse } from '../../utils/tool'
// import { getTaskSchema } from './data/schema'

const fetchData = async ({ tableName, pageIndex, pageSize }) => {
  const resp = await sendRequest({
    url: `/bk/select/${tableName}`,
    method: 'post',
    params: { currentPage: pageIndex + 1, pageSize },
  })

  return {
    rows: resp.data?.list ?? [],
    pageCount: Math.ceil(resp.data.total / pageSize),
  }
}

const filterNames = {
  car_model: 'modelName',
  user: 'userName',
  car_info: 'name',
  brand: 'brandName',
  sub_brand: 'subBrandName',
}

export function DataTable({ tableName }) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editData, setEditData] = React.useState({
    tableName,
    columns: [],
    data: {},
    model: 'edit',
  })

  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const fetchDataOptions = {
    tableName,
    pageIndex,
    pageSize,
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => fetchData(fetchDataOptions),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tableData'],
      })
    },
  })
  const dataQuery = useQuery(['tableData', fetchDataOptions], () => fetchData(fetchDataOptions), {
    keepPreviousData: true,
  })

  const defaultData = React.useMemo(() => [], [])

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const { toast } = useToast()

  const columns = React.useMemo(() => getColumns(tableName), [tableName])

  const filters = React.useMemo(() => getFilters(tableName), [tableName])

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    pageCount: dataQuery.data?.pageCount ?? -1,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
      columnFilters,
    },
    meta: {
      editData: task => {
        setEditData({
          tableName,
          columns: getColumnsModel(tableName).map(item => ({
            accessorKey: item.accessorKey,
            title: item.title,
          })),
          data: task,
          model: 'edit',
        })
        setDialogOpen(true)
      },
      deleteData: task => {
        const deleteTableData = async () => {
          const resp = await sendRequest({
            url: `/bk/delete/${tableName}/${task[getColumnsModel(tableName)[0]?.accessorKey]}`,
            method: 'post',
          })

          handleResponse(toast, resp, '删除信息提示')
          mutate()
        }

        deleteTableData()
      },
      addData: () => {
        const col = getColumnsModel(tableName).map(item => ({
          accessorKey: item.accessorKey,
          title: item.title,
        }))
        setEditData({
          tableName,
          columns: col,
          data: col.reduce((acc, item) => {
            acc[item.accessorKey] = null
            return acc
          }, {}),
          model: 'add',
        })
        setDialogOpen(true)
      },
    },
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
  })

  React.useEffect(() => {
    table.setPageIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName])

  return (
    <>
      <EditInfo editData={editData} open={dialogOpen} onOpenChange={setDialogOpen} refresh={mutate} />
      <div className="space-y-4">
        <DataTableToolbar table={table} filters={filters} inputFilterName={filterNames[tableName]} />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </>
  )
}
