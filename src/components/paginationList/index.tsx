import React from 'react'
import * as Pagination from '@/components/ui/pagination'

interface IPaginationProps {
  pageIndex: number
  lastPage: number
  setPageIndex: (index: number) => void
}

export default function PaginationList({
  pageIndex,
  setPageIndex,
  lastPage,
}: IPaginationProps) {
  return (
    <Pagination.Root className="flex-1">
      <Pagination.Content>
        {pageIndex > 1 && (
          <>
            <Pagination.Item>
              <Pagination.Previous
                onClick={() => setPageIndex(pageIndex - 1)}
              />
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Link onClick={() => setPageIndex(1)}>
                {1}
              </Pagination.Link>
            </Pagination.Item>
          </>
        )}
        {pageIndex - 1 > 1 && (
          <>
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Link onClick={() => setPageIndex(pageIndex - 1)}>
                {pageIndex - 1}
              </Pagination.Link>
            </Pagination.Item>
          </>
        )}
        <Pagination.Item>
          <Pagination.Link isActive>{pageIndex}</Pagination.Link>
        </Pagination.Item>
        {pageIndex + 1 < lastPage && (
          <>
            <Pagination.Item>
              <Pagination.Link onClick={() => setPageIndex(pageIndex + 1)}>
                {pageIndex + 1}
              </Pagination.Link>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          </>
        )}
        {lastPage && pageIndex < lastPage && (
          <Pagination.Item>
            <Pagination.Link onClick={() => setPageIndex(lastPage)}>
              {lastPage}
            </Pagination.Link>
          </Pagination.Item>
        )}
        {pageIndex < lastPage && (
          <Pagination.Item>
            <Pagination.Next onClick={() => setPageIndex(pageIndex + 1)} />
          </Pagination.Item>
        )}
      </Pagination.Content>
    </Pagination.Root>
  )
}
