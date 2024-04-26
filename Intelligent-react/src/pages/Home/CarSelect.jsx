/* eslint-disable react/prop-types */
import React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { getAllBrand, getModel, getSubBrand } from '../../utils/api'

export default function CarSelect({ selectItems, setSelectItems, field, setFiled, selectItemWidth }) {
  const onValueChange = (propName, value) => {
    if (propName === 'brand') {
      setFiled({
        brand: value,
        subBrand: undefined,
        model: undefined,
      })

      getSubBrand(value.name).then(resp => {
        setSelectItems({
          ...selectItems,
          subBrand: resp?.data ?? [],
        })
      })
    } else if (propName === 'subBrand') {
      setFiled({
        brand: field.brand,
        subBrand: value,
        model: undefined,
      })

      getModel(null, value.name).then(resp => {
        setSelectItems({
          ...selectItems,
          model: resp?.data ?? [],
        })
      })
    } else {
      setFiled({
        ...field,
        model: value,
      })
    }
  }

  React.useEffect(() => {
    getAllBrand().then(resp => {
      setSelectItems({
        brand: resp?.data ?? [],
        subBrand: [],
        model: [],
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex items-center space-x-4">
      <Select value={field.brand} onValueChange={value => onValueChange('brand', value)}>
        <SelectTrigger className={selectItemWidth}>
          <SelectValue placeholder="选择汽车品牌" />
        </SelectTrigger>
        <SelectContent className="SelectContent" position="popper">
          {selectItems.brand.map(item => (
            <SelectItem key={item.id} value={item}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={field.subBrand} onValueChange={value => onValueChange('subBrand', value)}>
        <SelectTrigger className={selectItemWidth}>
          <SelectValue placeholder="选择汽车子品牌" />
        </SelectTrigger>
        <SelectContent className="SelectContent" position="popper">
          <SelectGroup>
            {!field.brand && <SelectLabel>请选择汽车品牌</SelectLabel>}
            {selectItems.subBrand.map(item => (
              <SelectItem key={item.id} value={item}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={field.model} onValueChange={value => onValueChange('model', value)}>
        <SelectTrigger className={selectItemWidth}>
          <SelectValue placeholder="选择车型" />
        </SelectTrigger>
        <SelectContent className="SelectContent" position="popper">
          <SelectGroup>
            {!field.subBrand && <SelectLabel>请选择汽车子品牌</SelectLabel>}
            {selectItems.model.map(item => (
              <SelectItem key={item.id} value={item}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
