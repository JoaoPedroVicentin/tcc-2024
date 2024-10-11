import React from 'react'
import * as Pagination from '@/components/ui/pagination'
import { IPaginationProps } from './interface/paginationProps.interface'

export default function PaginationList({
  pageIndex,
  setPageIndex,
  lastPage,
}: IPaginationProps) {
  return (
    <Pagination.Root>
      <Pagination.Content className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap">
          {pageIndex > 1 && (
            <Pagination.Item>
              <Pagination.Link onClick={() => setPageIndex(1)}>
                {1}
              </Pagination.Link>
            </Pagination.Item>
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
        </div>
        <div className="flex">
          {pageIndex > 1 && (
            <Pagination.Item>
              <Pagination.Previous
                onClick={() => setPageIndex(pageIndex - 1)}
              />
            </Pagination.Item>
          )}
          {pageIndex < lastPage && (
            <Pagination.Item>
              <Pagination.Next onClick={() => setPageIndex(pageIndex + 1)} />
            </Pagination.Item>
          )}
        </div>
      </Pagination.Content>
    </Pagination.Root>
  )
}
