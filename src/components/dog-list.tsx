import DogCard from '@/components/dog-card';

interface DogDetails {
    img: string;
    name: string;
    age: number;
    breed: string;
    zip_code: string;
    id: string;
};

interface DogListProps {
  dogDetails: DogDetails[]
};

export default function DogList({ dogDetails }: DogListProps) {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {dogDetails?.map((dog) => (
        <DogCard key={dog.id} details={dog} />
      ))}
    </div>
  )
};