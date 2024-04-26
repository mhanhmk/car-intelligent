/* eslint-disable react/prop-types */
import React from 'react'

import { Button } from '../../components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import sendRequest from '../../plugins/axios'
import { useToast } from '../../components/ui/use-toast'
import { handleResponse } from '../../utils/tool'

export function EditInfo({ editData, open, onOpenChange, refresh }) {
  // columns.reduce((acc, item) => {
  //   acc[item.accessorKey] = ''
  //   return acc
  // }, {})
  const { toast } = useToast()
  const [fromData, setFromData] = React.useState(editData.data)

  React.useEffect(() => {
    setFromData(editData.data)
  }, [editData])

  const handleChange = e => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    const sendEdit = async () => {
      const resp = await sendRequest({
        url: editData.model === 'edit' ? `/bk/update/${editData.tableName}` : `/bk/insert/${editData.tableName}`,
        method: 'post',
        data: fromData,
      })

      handleResponse(toast, resp, editData.model === 'edit' ? '编辑信息提示' : '添加信息提示')
      if (resp?.code === 200 || resp?.code === 205) {
        onOpenChange(false)
      }
      refresh()
    }

    sendEdit()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editData.model === 'edit' ? '编辑信息' : '添加信息'}</DialogTitle>
          {/* <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription> */}
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          {editData.columns.map((item, index) => (
            <div key={index} className="gird">
              <Label htmlFor={item.accessorKey} className="text-right">
                {item.title}
              </Label>
              <Input
                id={item.accessorKey}
                name={item.accessorKey}
                value={fromData[item.accessorKey] ?? ''}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={() => handleSave()}>{editData.model === 'edit' ? '保存' : '提交'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
