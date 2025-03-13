import { NextRequest, NextResponse } from 'next/server';
import { fetchDogDetails } from '@/lib/fetch-dogs';

export async function POST(req: NextRequest) {
  const favorites = await req.json();
  const cookie = req.cookies.get('fetch-access-token');

  if (!cookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const favoritedDogs = favorites?.length
    ? await fetchDogDetails(JSON.parse(favorites))
    : [];

  const result = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `fetch-access-token=${cookie.value}`
    },
    credentials: 'include',
    body: favorites,
  });

  const data = await result.json();
  const matched = await fetchDogDetails([data.match]);

  return NextResponse.json({
    matched: matched[0],
    favoritedDogs
  });
}