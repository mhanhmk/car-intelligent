import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '../../../components/ui/button'
import { classNames } from '../../../utils/tool'

const range = (start, end) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

// eslint-disable-next-line react/prop-types
export default function Pagination({ count, onClick, size = 20 }) {
  const [pageIndex, setPageIndex] = React.useState(1)

  React.useEffect(() => {
    setPageIndex(1)
  }, [count])

  const items = React.useMemo(
    () =>
      count < 10
        ? range(1, count)
        : [
            1,
            pageIndex > 5 ? '...' : 2,
            ...range(Math.max(3, Math.min(count - 6, pageIndex - 2)), Math.min(Math.max(pageIndex + 2, 7), count - 2)),
            pageIndex < count - 3 ? '...' : count - 1,
            count,
          ],
    [pageIndex, count]
  )

  return (
    <div className="w-full flex justify-center h-24">
      <ul className="flex items-center space-x-2">
        <li>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPageIndex(pageIndex - 1)
              onClick(pageIndex - 1, size)
            }}
            disabled={pageIndex === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <Button
              variant="outline"
              className={classNames(item === pageIndex ? ' bg-black bg-opacity-10' : '', 'h-8 w-8 p-0')}
              onClick={() => {
                setPageIndex(item)
                onClick(item, size)
              }}
              disabled={item === '...'}
            >
              <span>{item}</span>
            </Button>
          </li>
        ))}
        <li>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPageIndex(pageIndex + 1)
              onClick(pageIndex + 1, size)
            }}
            disabled={pageIndex === count}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </li>
      </ul>
    </div>
  )
}
