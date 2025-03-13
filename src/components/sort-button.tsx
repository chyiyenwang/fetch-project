'use client';

import { sortByBreed } from "@/actions"
import { useSearchParams } from 'next/navigation';

export default function SortButton() {
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get('sort') === 'breed:desc' ? 'breed:asc' : 'breed:desc'

  return (
    <form action={sortByBreed}>
      <button name="sort" value={sortOrder}>Sort by Breed {sortOrder === 'breed:asc' ? <span>&uarr;</span> : <span>&darr;</span>}</button>
    </form>
  )
};