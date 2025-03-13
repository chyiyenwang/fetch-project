import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

const url = 'https://frontend-take-home-service.fetch.com';

interface FetchDogsOptions {
  size?: string;
  from?: string;
  breeds?: string;
  zipCodes?: string;
  ageMin?: string;
  ageMax?: string;
  sort?: string;
};

function getAuthHeaders(cookie: string) {
  return {
    'Content-Type': 'application/json',
    'Cookie': `fetch-access-token=${cookie}`,
  };
}

export const fetchDogs = cache(async (options: FetchDogsOptions): Promise<{
  breeds: string[];
  dogDetails: FetchDogDetailsReturn[];
  dogs: FetchDogsSearchReturn;
}> => {
  const dogs = await fetchDogsSearch(options);
  const dogDetails = dogs?.resultIds?.length
    ? await fetchDogDetails(dogs.resultIds)
    : [];
  const breeds = await fetchBreeds();

  return {
    dogs,
    dogDetails,
    breeds,
  };
});

interface FetchDogsSearchReturn {
  next?: string;
  prev?: string;
  resultIds: string[];
  total: number;
}

export async function fetchDogsSearch(
  options: FetchDogsOptions
): Promise<FetchDogsSearchReturn> {
  const cookie = (await cookies()).get("fetch-access-token")?.value;

  if (!cookie) {
    throw new Error('No access token found');
  }

  const queryParams = new URLSearchParams();

  Object.entries(options)
    .forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
    }
  });

  try {
    const path = `/dogs/search?${queryParams.toString()}`;
    const res = await fetch(url + path, {
      method: 'GET',
      headers: {
        'Cookie': `fetch-access-token=${cookie}`
      }
    });
  
    if (res.status === 401) {
      throw new Error('Not Authorized')
    }

    const data = (await res.json()) as FetchDogsSearchReturn;
    return data;
  } catch(err) {
    console.error('Fetch error:', err);
    redirect('/');
  }
};

interface FetchDogDetailsReturn {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
};

export async function fetchDogDetails(resultIds: string[]): Promise<FetchDogDetailsReturn[]> {
  const cookie = (await cookies()).get("fetch-access-token")?.value;

  if (!cookie) {
    throw new Error('No access token found');
  }

  const path = '/dogs';
  const res = await fetch(url + path, {
    method: 'POST',
    headers: getAuthHeaders(cookie),
    body: JSON.stringify(resultIds)
  });

  if (res.status === 401) {
    throw new Error(`Fetch failed with status ${res.status}`);
  };

  const data = (await res.json()) as FetchDogDetailsReturn[];
  return data;
};

export async function fetchBreeds() {
  const cookie = (await cookies()).get("fetch-access-token")?.value;

  if (!cookie) {
    throw new Error('No access token found');
  }

  const path = '/dogs/breeds';
  const res = await fetch(url + path, {
    method: 'GET',
    headers: getAuthHeaders(cookie)
  })
  if (res.status === 401) {
    throw new Error(`Fetch failed with status ${res.status}`);
  };

  const data = (await res.json())
  return data;
};