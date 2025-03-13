'use client';

import { Suspense } from 'react';
import Input from '@/components/search/input';
import Suggestions from '@/components/search/suggestions';
import SortButton from '@/components/sort-button';
import { useSearch } from '@/hooks/useSearch'

interface SearchInputProps {
  breeds: string[];
}

export default function SearchInput({ breeds }: SearchInputProps) {
  const {
    inputValue,
    suggestions,
    handleInputChange,
    handleSuggestionClick,
  } = useSearch(breeds);

  return (
    <Suspense>
      <div className="flex flex-col gap-2 m-4 items-center relative">
        <SortButton />
        <Input
          inputValue={inputValue}
          suggestions={suggestions}
          handleInputChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
    </Suspense>
  )
}