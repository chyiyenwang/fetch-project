import SearchInput from "@/components/search/search-input";
import DogList from "@/components/dog-list";
import Pagination from "@/components/pagination";
import { fetchDogs } from "@/lib/fetch-dogs";

interface SearchPageProps {
  searchParams: Promise<{
    size?: string;
    from?: string;
    breeds?: string;
    zipCodes?: string;
    ageMin?: string;
    ageMax?: string;
    sort?: string;
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const data = await fetchDogs(params);

  if (!data) {
    return null;
  }
  
  const { next, prev } = data.dogs;

  return (
    <>
        <SearchInput breeds={data.breeds} />
        <div className="m-4">
          <DogList dogDetails={data.dogDetails} />
        </div>
        <div className="m-auto max-w-[400px]">
          <Pagination next={next} previous={prev} />
        </div>
    </>
  )
}

