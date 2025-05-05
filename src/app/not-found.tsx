import AppShell from "@/components/AppShell";
import { Header } from "@/components/Header";

const guestLinks = [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Program', href: '#program' },
    { label: 'Dampak', href: '#dampak' },
    { label: 'Bergabung', href: '#gabung' },
    { label: 'Kontak', href: '#kontak' },
];

export default function HomeLayout() {
    return (
        <AppShell header={<Header links={guestLinks} />}>
            <h1>Not Found</h1>
        </AppShell>
    );
}

