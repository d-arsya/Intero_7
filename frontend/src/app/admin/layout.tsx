import AppShell from "@/components/AppShell";
import { Header } from "@/components/Header";
import { Metadata } from "next";

const guestLinks = [
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Program', href: '#program' },
  { label: 'Dampak', href: '#dampak' },
  { label: 'Bergabung', href: '#gabung' },
  { label: 'Kontak', href: '#kontak' },
];

export const metadata: Metadata = {
  title: {
    default: 'Berbagi Bites Jogja',
    template: '%s | Berbagi Bites Jogja',
  },
  description:
    'Berbagi Bites Jogja (BBJ) adalah Gerakan food rescue pertama di Jogja. Bergerak mengatasi Food Waste melalui Food Rescue dan Food Bank di wilayah Yogyakarta',
  metadataBase: new URL('https://next.berbagibitesjogja.site'),
  openGraph: {
    title: 'Berbagi Bites Jogja',
    description:
      'Berbagi Bites Jogja (BBJ) adalah Gerakan food rescue pertama di Jogja. Bergerak mengatasi Food Waste melalui Food Rescue dan Food Bank di wilayah Yogyakarta',
    url: 'https://next.berbagibitesjogja.site',
    type: 'website',
    images: [
      {
        url: '/shareable-card-preview.jpg',
        alt: 'Berbagi Bites Jogja',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berbagi Bites Jogja',
    description:
      'Berbagi Bites Jogja (BBJ) adalah Gerakan food rescue pertama di Jogja. Bergerak mengatasi Food Waste melalui Food Rescue dan Food Bank di wilayah Yogyakarta',
    images: [
      '/shareable-card-preview.jpg',
    ],
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell header={<Header links={guestLinks} />}>
      {children}
    </AppShell>
  );
}
