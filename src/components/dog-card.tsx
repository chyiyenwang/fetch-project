'use client';

import { Card, CardHeader, CardBody, Image as CardImage, Skeleton } from "@heroui/react";
import Favorite from "./favorite";
import { useState, useEffect } from 'react';

interface DogCardProps {
  details: {
    id: string;
    breed: string;
    name: string;
    img: string;
    zip_code: string;
    age: number;
  }
}

function DogCardSkeleton() {
  return (
    <Card className="flex flex-row overflow-hidden" radius="lg" shadow="lg">
      <Skeleton className="w-[150px] h-[150px] rounded-lg" />
      <div className="flex-1 bg-white p-4 space-y-2">
        <Skeleton className="h-6 w-full rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
    </Card>
  );
}

export default function DogCard({
  details: { id, breed, name, img, zip_code, age }
}: DogCardProps) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const image = new Image();
    image.src = img;
    image.onload = () => setLoading(false);
  }, [img]);

  return (
    <>
      {loading ? (
        <DogCardSkeleton />
      ) : (
          <Card
            key={id}
            className="flex flex-row overflow-hidden"
            radius="lg"
            shadow="lg"
          >
            <CardImage
              alt={`${breed} - ${name}`}
              className="object-cover min-w-[150px] rounded-r-none"
              radius="lg"
              shadow="lg"
              src={img}
              width={150}
              height={150}
              
            />
            <div className="flex-1 bg-white p-4 w-full truncate">
              <CardHeader className="pt-2 pb-2 pl-0">
                <h1 className="text-lg font-bold font-serif">{name}</h1>
                <div className="absolute top-[2px] right-[10px]">
                  <Favorite id={id} />
                </div>
              </CardHeader>
              <CardBody className="p-0 text-md font-sans pt-2">
                <p className="truncate">{breed}</p>
                <small>Age: {age}</small>
                <small>Zip: {zip_code}</small>
              </CardBody>
            </div>
          </Card>
        )
      }
    </>
  )
}