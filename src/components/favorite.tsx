'use client';

import { useEffect, useState, useCallback } from 'react';

interface FavoriteProps {
  id: string;
}

export default function Favorite({ id }: FavoriteProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const getFavoritesFromLocalStorage = useCallback((): string[] => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }, []);

  const updateFavoritesInLocalStorage = useCallback((updatedFavorites: string[]) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }, []);

  useEffect(() => {
    setFavorites(getFavoritesFromLocalStorage());
  }, [getFavoritesFromLocalStorage]);

  const isFavorite = favorites.includes(id);

  const handleClick = () => {
    const updatedLocal = getFavoritesFromLocalStorage()
    const updatedFavorites = isFavorite
      ? updatedLocal.filter(favId => favId !== id)
      : [...updatedLocal, id];
    updateFavoritesInLocalStorage(updatedFavorites);
  };

  return (
    <button onClick={handleClick}>
      {isFavorite
        ? <span className="text-red-500 text-lg">&#9829;</span>
        : <span>&#9825;</span> }
    </button>
  );
}