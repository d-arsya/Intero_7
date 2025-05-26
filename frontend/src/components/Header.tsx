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
        <header className='flex justify-between py-6 items-center px-6 md:px-32 sticky top-0 z-50 bg-white shadow-md'>
            <Link href="/" className='flex items-center gap-x-2'>
                <Image src="/plain-logo-blue.png" alt="bbj-logo" width='40' height='40' />
                <span className='text-navy font-bold text-xl md:text-2xl'>BBJ <span className='text-[#F5B041]'>Donate</span></span>
            </Link>
            <nav className='flex ms-auto space-x-12 items-center'>
                <ul className="hidden md:flex space-x-12">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link className='font-semibold text-sm' href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
                <Link className='bg-[#F5B041] text-sm rounded-full h-max py-2 text-white font-semibold px-4 md:px-6 hidden md:block' href="/">Donasi Sekarang</Link>
                <Link className='' href="login">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                        <g clipPath="url(#clip0_193_815)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.5 40.7812C25.7093 40.786 28.8628 39.9418 31.6406 38.3344V32.3438C31.6406 30.6654 30.9739 29.0558 29.7872 27.8691C28.6004 26.6823 26.9908 26.0156 25.3125 26.0156H19.6875C18.0092 26.0156 16.3996 26.6823 15.2128 27.8691C14.0261 29.0558 13.3594 30.6654 13.3594 32.3438V38.3344C16.1372 39.9418 19.2907 40.786 22.5 40.7812ZM35.8594 32.3438V34.9791C38.2914 32.3756 39.9096 29.1182 40.5152 25.6073C41.1208 22.0965 40.6873 18.4852 39.2681 15.2174C37.8489 11.9496 35.5058 9.16766 32.5268 7.21362C29.5477 5.25958 26.0627 4.21858 22.5 4.21858C18.9373 4.21858 15.4523 5.25958 12.4732 7.21362C9.49423 9.16766 7.1511 11.9496 5.73187 15.2174C4.31265 18.4852 3.8792 22.0965 4.4848 25.6073C5.09039 29.1182 6.70864 32.3756 9.14062 34.9791V32.3438C9.13979 30.1692 9.81115 28.0475 11.0628 26.2692C12.3144 24.4909 14.0852 23.143 16.1325 22.41C15.0705 21.1884 14.3822 19.6871 14.1499 18.0852C13.9175 16.4833 14.1509 14.8483 14.8221 13.3754C15.4933 11.9024 16.574 10.6536 17.9354 9.77789C19.2968 8.9022 20.8813 8.43659 22.5 8.43659C24.1187 8.43659 25.7032 8.9022 27.0646 9.77789C28.426 10.6536 29.5067 11.9024 30.1779 13.3754C30.8491 14.8483 31.0825 16.4833 30.8501 18.0852C30.6178 19.6871 29.9295 21.1884 28.8675 22.41C30.9148 23.143 32.6856 24.4909 33.9372 26.2692C35.1888 28.0475 35.8602 30.1692 35.8594 32.3438ZM22.5 45C28.4674 45 34.1903 42.6295 38.4099 38.4099C42.6295 34.1903 45 28.4674 45 22.5C45 16.5326 42.6295 10.8097 38.4099 6.5901C34.1903 2.37053 28.4674 0 22.5 0C16.5326 0 10.8097 2.37053 6.5901 6.5901C2.37053 10.8097 0 16.5326 0 22.5C0 28.4674 2.37053 34.1903 6.5901 38.4099C10.8097 42.6295 16.5326 45 22.5 45ZM26.7188 16.875C26.7187 17.9939 26.2743 19.0669 25.4831 19.8581C24.6919 20.6493 23.6189 21.0938 22.5 21.0938C21.3811 21.0938 20.3081 20.6493 19.5169 19.8581C18.7257 19.0669 18.2812 17.9939 18.2812 16.875C18.2812 15.7561 18.7257 14.6831 19.5169 13.8919C20.3081 13.1007 21.3811 12.6563 22.5 12.6562C23.6189 12.6562 24.6919 13.1007 25.4831 13.8919C26.2743 14.6831 26.7188 15.7561 26.7188 16.875Z" fill="#344C36"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_193_815">
                            <rect width="45" height="45" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
            </nav>
            <MobileMenu links={links} />
        </header>
    )
}