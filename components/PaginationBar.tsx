import type { ReactNode } from 'react';
import { ChevronLeftIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export interface PaginationBarProps {
  href: string;
  page: number;
  pageCount: number;
}

export default function PaginationBar({ href, page, pageCount }: PaginationBarProps) {
  return (
    <div className="flex gap-[1rem] items-center">
      <PaginationLink href={`${href}?page=1}`} page={page}
        enabled={page > 1}>
        <ChevronDoubleLeftIcon className="w-[32px] h-[32px] border-none" />
      </PaginationLink>
      <PaginationLink href={`${href}?page=${page - 1}`} page={page}
        enabled={page > 1}>
        <ChevronLeftIcon className="w-[32px] h-[32px] border-none" />
      </PaginationLink>

      <InsidePagingationLink pageCount={pageCount} page={page} href={href} />

      <PaginationLink href={`${href}?page=${page + 1}`} page={page}
        enabled={page < pageCount}>
        <ChevronRightIcon className="w-[32px] h-[32px] border-none" />
      </PaginationLink>
      <PaginationLink href={`${href}?page=${pageCount}`} page={page}
        enabled={page < pageCount} >
        <ChevronDoubleRightIcon className="w-[32px] h-[32px] border-none" />
      </PaginationLink>
    </div>
  );
}

interface PaginationLinkProps {
  children: ReactNode;
  enabled: boolean;
  href: string;
  page: number;
}

function PaginationLink({ children, enabled, href, page }: PaginationLinkProps) {
  if (!enabled) {
    return (
      <span
        className="border cursor-not-allowed rounded-3xl text-slate-300 text-[14px] ">
        {children}
      </span>
    );
  }
  return (
    <Link href={href}
      className={page !== children ? `border rounded-3xl text-slate-500 text-[14px] flex justify-center items-center
                 hover:bg-orange-100 hover:text-slate-700 w-[32px] h-[32px]`: `border rounded-3xl text-[14px] flex justify-center items-center
                bg-#F4F5E2 hover:text-slate-700 w-[32px] h-[32px]`}>
      {children}
    </Link>
  );
}

function InsidePagingationLink({ pageCount, page, href }: { pageCount: number, page: number, href: string }) {
  if (pageCount === 3) {
    return <PaginationLink href={`${href}?page=1`} page={page} enabled>2</PaginationLink>
  }
  if (pageCount === 4) {
    return (
      <div className='flex gap-2 items-center'>
        <PaginationLink href={`${href}?page=2`} enabled page={page}>2</PaginationLink>
        <PaginationLink href={`${href}?page=${pageCount - 1}`} enabled page={page}>{pageCount - 1}</PaginationLink>
      </div>
    )
  }
  if (pageCount >= 5) {
    if (page === 1 || page === 2) {
      return (
        <div className='flex items-center gap-[1rem]'>
          <PaginationLink href={`${href}?page=1`} enabled page={page} >{1}</PaginationLink>
          <PaginationLink href={`${href}?page=2`} enabled page={page}>{2}</PaginationLink>
          <PaginationLink href={`${href}?page=3`} enabled page={page}>{3}</PaginationLink>
          <button className="text-center text-[14px] w-[32px] h-[32px] border-gray-60 border-2 rounded-3xl">...</button>
          <PaginationLink href={`${href}?page=${pageCount}`} enabled page={page}>{pageCount}</PaginationLink>
        </div>
      )
    } else if (page === pageCount - 1 || page === pageCount) {
      return (
        <div className='flex gap-[1rem] items-center'>
          <PaginationLink href={`${href}?page=1`} enabled page={page} >{1}</PaginationLink>
          <button className="text-center text-[14px] w-[32px] h-[32px] border-gray-60 border-2 rounded-3xl">...</button>
          <PaginationLink href={`${href}?page=${pageCount - 2}`} enabled page={page}>{pageCount - 2}</PaginationLink>
          <PaginationLink href={`${href}?page=${pageCount - 1}`} enabled page={page}>{pageCount - 1}</PaginationLink>
          <PaginationLink href={`${href}?page=${pageCount}`} enabled page={page}>{pageCount}</PaginationLink>
        </div>
      )
    } else if (page === 3) {
      return (
        <div className='flex gap-[1rem] items-center'>
          <PaginationLink href={`${href}?page=2`} enabled page={page}>{2}</PaginationLink>
          <PaginationLink href={`${href}?page=3`} enabled page={page}>{3}</PaginationLink>
          <PaginationLink href={`${href}?page=4`} enabled page={page}>{4}</PaginationLink>
          <button className="text-center text-[14px] w-[32px] h-[32px] border-gray-60 border-2 rounded-3xl">...</button>
          <PaginationLink href={`${href}?page=${pageCount}`} enabled page={page}>{pageCount}</PaginationLink>
        </div>
      )
    } else if (page === pageCount - 2) {
      return (
        <div className='flex gap-[1rem] items-center'>
          <PaginationLink href={`${href}?page=1`} enabled page={page} >{1}</PaginationLink>
          <button className="text-center text-[14px] w-[32px] h-[32px] border-gray-60 border-2 rounded-3xl">...</button>
          <PaginationLink href={`${href}?page=${pageCount - 3}`} enabled page={page}>{pageCount - 3}</PaginationLink>
          <PaginationLink href={`${href}?page=${pageCount - 2}`} enabled page={page}>{pageCount - 2}</PaginationLink>
          <PaginationLink href={`${href}?page=${pageCount-1}`} enabled page={page}>{pageCount-1}</PaginationLink>
        </div>
      )
    } else {
      return (
        <div className='flex gap-[1rem] items-center'>
          <PaginationLink href={`${href}?page=1`} enabled page={page} >{1}</PaginationLink>
          <button className="text-center text-[14px] w-[32px] h-[32px] border-gray-60 border-2 rounded-3xl">...</button>
          <PaginationLink href={`${href}?page=${page}`} enabled page={page}>{page}</PaginationLink>
          <button className="text-center text-[14px] w-[32px] h-[32px] border-gray-60 border-2 rounded-3xl">...</button>
          <PaginationLink href={`${href}?page=${pageCount}`} enabled page={page}>{pageCount}</PaginationLink>
        </div>
      )
    }
  }
}
