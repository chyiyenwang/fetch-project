'use client';

import { useEffect, useState } from "react";
import DogCard from "@/components/dog-card";

export default function FavoritesPage() {
  const [ data, setData ] = useState([]);

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

  return (
    <div className="m-auto w-[400px]">
      {data.length > 0 && (
        <DogCard details={data[0]} />
      )}
    </div>
  )
};