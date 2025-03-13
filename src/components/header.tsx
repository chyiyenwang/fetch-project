'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    page: 'Search',
    href: '/dogs/search?sort=breed:asc',
  },
  {
    page: 'Match',
    href: '/dogs/match',
  }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <h1>
          <Link href="/">
          FETCH
          </Link>
        </h1>
      </NavbarBrand>
      <NavbarContent justify='end'>
        {links.map(item => {
          const isActive = pathname === item.href || (item.href.startsWith(pathname) && pathname !== '/')
          return (
            <NavbarItem key={item.page}>
              <Link
                href={item.href}
                className={isActive ? 'hover:underline underline' : 'hover:underline'}
              >
                {item.page}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
    </Navbar>
  )
}