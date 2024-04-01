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
    <div className="flex gap-2 items-center">
      <PaginationLink href={`${href}?page=1}`} page={page}
        enabled={page > 1}>
        <ChevronDoubleLeftIcon className="md:h-[7rem] md:w-[7rem] sm:h-[4rem] sm:w-[4rem] h-[2.5rem] w-[2.5rem]" />
      </PaginationLink>
      <PaginationLink href={`${href}?page=${page - 1}`} page={page}
        enabled={page > 1}>
        <ChevronLeftIcon className="md:h-[7rem] md:w-[7rem] sm:h-[4rem] sm:w-[4rem] h-[2.5rem] w-[2.5rem]" />
      </PaginationLink>

      <InsidePagingationLink pageCount={pageCount} page={page} href={href} />

      <PaginationLink href={`${href}?page=${page + 1}`} page={page}
        enabled={page < pageCount}>
        <ChevronRightIcon className="md:h-[7rem] md:w-[7rem] sm:h-[4rem] sm:w-[4rem] h-[2.5rem] w-[2.5rem]" />
      </PaginationLink>
      <PaginationLink href={`${href}?page=${pageCount}`} page={page}
        enabled={page < pageCount} >
        <ChevronDoubleRightIcon className="md:h-[7rem] md:w-[7rem] sm:h-[4rem] sm:w-[4rem] h-[2.5rem] w-[2.5rem]" />
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
        className="border cursor-not-allowed rounded text-slate-300 text-[2rem]">
        {children}
      </span>
    );
  }
  return (
    <Link href={href}
      className={page !== children ? `border rounded text-slate-500 md:text-[4rem] text-[2rem] flex justify-center items-center
                 hover:bg-orange-100 hover:text-slate-700 md:h-[7rem] md:w-[7rem] sm:h-[4rem] sm:w-[4rem] h-[2.5rem] w-[2.5rem]`: `border rounded text-red-500 md:text-[4rem] text-[2rem] flex justify-center items-center
                bg-blue-500 hover:text-slate-700 md:h-[7rem] md:w-[7rem] sm:h-[4rem] sm:w-[4rem] h-[2.5rem] w-[2.5rem]`}>
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
        <div className='flex gap-2 items-center'>
          <PaginationLink href={`${href}?page=1`} enabled page={page} >{1}</PaginationLink>
          <PaginationLink href={`${href}?page=2`} enabled page={page}>{2}</PaginationLink>
          <PaginationLink href={`${href}?page=3`} enabled page={page}>{3}</PaginationLink>
          <button>...</button>
          <PaginationLink href={`${href}?page=${pageCount}`} enabled page={page}>{pageCount}</PaginationLink>
        </div>
      )
    } else if (page === pageCount - 1 || page === pageCount) {
      return (
        <div className='flex gap-2 items-center'>
          <PaginationLink href={`${href}?page=1`} enabled page={page} >{1}</PaginationLink>
          <button>...</button>
          <PaginationLink href={`${href}?page=${pageCount - 2}`} enabled page={page}>{pageCount - 2}</PaginationLink>
          <PaginationLink href={`${href}?page=${pageCount - 1}`} enabled page={page}>{pageCount - 1}</PaginationLink>
          <PaginationLink href={`${href}?page=${pageCount}`} enabled page={page}>{pageCount}</PaginationLink>
        </div>
      )
    } else if (page === 3) {
      return (
        <div className='flex gap-2 items-center'>
          <PaginationLink href={`${href}?page=2`} enabled page={page}>{2}</PaginationLink>
          <PaginationLink href={`${href}?page=3`} enabled page={page}>{3}</PaginationLink>
          <PaginationLink href={`${href}?page=4`} enabled page={page}>{4}</PaginationLink>
          <button>...</button>
          <PaginationLink href={`${href}?page=${pageCount}`} enabled page={page}>{pageCount}</PaginationLink>
        </div>
      )
    } else if (page === pageCount - 2) {
      return (
        <div className='flex gap-2 items-center'>
          <PaginationLink href={`${href}?page=1`} enabled page={page} >{1}</PaginationLink>
          <button>...</button>
          <PaginationLink href={`${href}?page=${pageCount - 3}`} enabled page={page}>{pageCount - 3}</PaginationLink>
          <PaginationLink href={`${href}?page=${pageCount - 2}`} enabled page={page}>{pageCount - 2}</PaginationLink>
          <PaginationLink href={`${href}?page=${pageCount-1}`} enabled page={page}>{pageCount-1}</PaginationLink>
        </div>
      )
    } else {
      return (
        <div className='flex gap-2 items-center'>
          <PaginationLink href={`${href}?page=1`} enabled page={page} >{1}</PaginationLink>
          <button>...</button>
          <PaginationLink href={`${href}?page=${page}`} enabled page={page}>{page}</PaginationLink>
          <button>...</button>
          <PaginationLink href={`${href}?page=${pageCount}`} enabled page={page}>{pageCount}</PaginationLink>
        </div>
      )
    }
  }
}
