import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dogs/search", "/dogs/match"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookie = (await cookies()).get('fetch-access-token')?.value;

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
};