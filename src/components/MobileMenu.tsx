"use client"

import * as React from "react"
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavLink {
    label: string;
    href: string;
}

interface HeaderProps {
    links: NavLink[];
}

export function MobileMenu({ links }: HeaderProps) {

    return (
        <nav className="block md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Berbagi Bites Jogja</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {links.map((e) => {
                        return (

                            <DropdownMenuCheckboxItem key={e.label}>
                                <Link href={e.href}>{e.label}</Link>
                            </DropdownMenuCheckboxItem>
                        )
                    }

                    )}
                </DropdownMenuContent>
            </DropdownMenu>

        </nav>
    )
}
