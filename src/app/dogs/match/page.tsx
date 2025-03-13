'use client';

import { useEffect, useState } from "react";
import DogCard from "@/components/dog-card";
import DogList from "@/components/dog-list";

interface DogDetails {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
};

interface DataProps {
  matched: DogDetails;
  favoritedDogs: DogDetails[];
}

export default function FavoritesPage() {
  const [ data, setData ] = useState<DataProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const stored = localStorage.getItem('favorites');
      const matches = await fetch('/api/match', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(stored),
      });
      const result = await matches.json();

      setData(result);
    };
    fetchData();
  }, []);

  const favorites = data?.favoritedDogs ?? [];
  return (
    <div className="m-4 gap-4">
      {data?.matched?.id && (
        <div>
          <h4>Available for adoption</h4>
          <div className="max-w-[400px]">
            <DogCard details={data.matched} />
          </div>
        </div>
      )}
      {favorites.length > 0 && (
          <div className="mt-4">
            <h4>Favorites</h4>
            <DogList dogDetails={favorites} />
          </div>
        )
      }
    </div>
  )
};