'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function useSearch(breeds: string[]) {
  const searchParams = useSearchParams();
  const [ inputValue, setInputValue ] = useState<string>(searchParams.get('breeds') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredSuggestions = value?.length
      ? breeds.filter(breed => breed.toLowerCase().includes(value.toLowerCase()))
      : [];
    setInputValue(value);
    setSuggestions(filteredSuggestions);
  };
  
  const handleSuggestionClick = (breed: string) => {
    setInputValue(breed);
    setSuggestions([]);
  };

  return {
    inputValue,
    suggestions,
    handleInputChange,
    handleSuggestionClick,
  };
};