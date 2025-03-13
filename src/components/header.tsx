'use server';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import Link from 'next/link';

export default async function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <h1>
          <Link href="/">
          Fetch
          </Link>
        </h1>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Link href="/dogs/match">
            Matches
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}