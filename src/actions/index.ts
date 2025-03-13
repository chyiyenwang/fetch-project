'use server';

import { createSession } from "@/lib/session";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from "zod";

const url = 'https://frontend-take-home-service.fetch.com';

const loginSchema = z.object({
  name: z.string().min(3).trim(),
  email: z.string().email({ message: 'Invalid email'}).trim()
})

interface FormState {
  errors: {
    name?: string[];
    email?: string[];
  }
}

export async function login(state: FormState, formData: FormData) {
  const user = loginSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!user.success) {
    return {
      errors: user.error.flatten().fieldErrors,
    }
  }

  const path = '/auth/login'
  const loginResponse = await fetch(url + path, {
    method: "POST",
    headers:  { 
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(user.data),
  })

  if (loginResponse.status !== 200) {
    console.log('error');
  }

  const setCookie = loginResponse.headers.get('set-cookie');
  const match = setCookie?.match(/fetch-access-token=([^;]+)/);
  const token = match?.[1];
  
  if (!token) {
    throw new Error("Token not found in Set-Cookie header");
  }
  
  await createSession(token);
  revalidatePath('/dogs/search');
  redirect('/dogs/search?sort=breed:asc');
}

export async function searchByBreed(formData: FormData) {
  const breed = formData.get('breeds');

  redirect(`/dogs/search?breeds=${breed}`);
}

export async function sortByBreed(formData: FormData) {
  const sort = formData.get('sort');

  redirect(`/dogs/search?sort=${sort}`)
}