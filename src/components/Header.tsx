'use client'

import Link from 'next/link';
import Image from 'next/image';
import { MobileMenu } from './MobileMenu';

interface NavLink {
    label: string;
    href: string;
}

interface HeaderProps {
    links: NavLink[];
}

export function Header({ links }: HeaderProps) {
    return (
        <header className='flex justify-between py-6 items-center px-6 md:px-32'>
            <Link href="/" className='flex items-center gap-x-2'>
                <Image src="/plain-logo-blue.png" alt="bbj-logo" width='40' height='40' />
                <span className='text-navy font-bold text-xl md:text-2xl'>Berbagi Bites Jogja</span>
            </Link>
            <nav>
                <ul className="hidden md:flex space-x-12">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link className='font-semibold text-sm' href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Link className='bg-navy text-sm rounded-full h-max py-2 text-white font-semibold px-4 md:px-6 hidden md:block' href="/">Donasi Sekarang</Link>
            <MobileMenu links={links} />
        </header>
    )
}