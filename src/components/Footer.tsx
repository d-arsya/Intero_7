import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, Music2, MapPin, Phone, Mail } from 'lucide-react';
export function Footer() {
    return (
        <footer className='bg-tosca px-6 md:px-32 py-12 text-white'>
            <nav className="flex md:flex-row flex-col gap-y-4 justify-between">
                <div className='md:max-w-1/4'>
                    <Link href="/" className='flex items-center gap-x-2'>
                        <Image src='/plain-logo-white.png' width="40" height="40" alt='bbj-logo' className='inline'></Image>
                        <span className='font-bold text-2xl'>Berbagi Bites Jogja</span>
                    </Link>
                    <p className='mt-2 leading-8'>Inisiatif nonprofit yang berfokus pada penyelamatan dan redistribusi makanan di seluruh Yogyakarta.</p>
                    <div className='flex mt-3 gap-x-2 text-slate-400 text-xs font-thin'>
                        <Link href="https://instagram.com/berbagibitesjogja">
                            <Instagram size='20' />
                        </Link>
                        <Link href="http://linkedin.com/company/berbagibitesjogja">
                            <Linkedin size='20' />
                        </Link>
                        <Link href="https://www.tiktok.com/@berbagibitesjogja">
                            <Music2 size='20' />
                        </Link>
                    </div>
                </div>
                <div>
                    <p className='font-bold text-xl'>Program</p>
                    <nav className='flex flex-col gap-y-2 mt-4'>
                        <Link href="/penyelamatan">
                            Penyelamatan
                        </Link>
                        <Link href="/distribusi">
                            Distribusi Makanan
                        </Link>
                        <Link href="/edukasi">
                            Edukasi Masyarakat
                        </Link>
                        <Link href="/">
                            Pelatihan Relawan
                        </Link>

                    </nav>
                </div>
                <div>
                    <p className='font-bold text-xl'>Terlibat</p>
                    <nav className='flex flex-col gap-y-2 mt-4'>
                        <Link href="/donasi">
                            Donasi
                        </Link>
                        <Link href="/gabung/relawan">
                            Menjadi Relawan
                        </Link>
                        <Link href="/gabung/mitra">
                            Menjadi Mitra
                        </Link>
                        <Link href="/">
                            Acara Mendatang
                        </Link>

                    </nav>
                </div>
                <div className='md:max-w-1/4'>
                    <p className='font-bold text-xl'>Kontak</p>
                    <nav className='flex flex-col gap-y-2 mt-4'>
                        <Link className='flex' href="https://maps.app.goo.gl/vHHZVQ4ymYhW1JhX6">
                            <MapPin className='w-20' />
                            <span className='w-full'>
                                Blk. A, Jl. Podocarpus II Bulaksumur, Sagan, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281

                            </span>
                        </Link>
                        <Link className='flex' href="https://wa.me/628986950700">
                            <Phone className='w-20' />
                            <span className='w-full'>
                                +62 898 695 0700

                            </span>
                        </Link>
                        <Link className='flex' href="mailto:berbagibitesjogja@gmail.com">
                            <Mail className='w-20' />
                            <span className='w-full'>
                                berbagibitesjogja@gmail.com
                            </span>
                        </Link>

                    </nav>
                </div>
            </nav>
            <div className="flex md:flex-row flex-col justify-between items-center mt-12 gap-y-6">
                <span>© 2025 Berbagi Bites Jogja. Semua hak dilindungi.</span>
                <nav className="flex justify-between gap-x-4">
                    <Link href="/">Kebijakan Privasi</Link>
                    <Link href="/">Syarat & Ketentuan</Link>
                    <Link href="/sitemap.xml">Peta Situs</Link>
                </nav>
            </div>
        </footer >
    )
}