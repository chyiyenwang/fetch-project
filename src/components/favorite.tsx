'use client';

import { useEffect, useState } from 'react';

interface FavoriteProps {
  id: string;
}

export default function Favorite({ id }: FavoriteProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const isFavorite = favorites.includes(id);

  const handleClick = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(favId => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <button onClick={handleClick}>
      {isFavorite
        ? <span className="text-red-500 text-lg">&#9829;</span>
        : <span>&#9825;</span> }
    </button>
  );
}