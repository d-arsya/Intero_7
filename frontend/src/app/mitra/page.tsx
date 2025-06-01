'use client';

import { useState, useEffect } from "react";

// Interface untuk data hotel
interface Hotel {
  name: string;
  latitude: string;
  longitude: string;
  address: string;
}

// Data dummy sebagai fallback
const dummyData: Hotel[] = [
  {
    name: "Royal Ambarukmo",
    latitude: "-7.798264",
    longitude: "110.392555",
    address: "Jl. Ipda Tut Harsono No.24, Yogyakarta",
  },
  {
    name: "Grand Mercure",
    latitude: "-7.782123",
    longitude: "110.375432",
    address: "Jl. Magelang No.10, Yogyakarta",
  },
  {
    name: "Hyatt Regency",
    latitude: "-7.775678",
    longitude: "110.388901",
    address: "Jl. Palagan Tentara Pelajar, Yogyakarta",
  },
];

export default function PageMitra() {
  // State untuk data hotel, loading, dan error
  const [hotels, setHotels] = useState<Hotel[]>(dummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ganti dengan false untuk menggunakan dummy data tanpa fetch
  const useApi = true;

  // Fetch data hotel
  useEffect(() => {
    if (!useApi) {
      setLoading(false);
      return;
    }

    const fetchHotels = async () => {
      try {
        const response = await fetch("https://intero-be.disyfa.cloud/api/hotels");
        const result = await response.json();
        if (result.code === 200) {
          setHotels(result.data);
        } else {
          setError("Gagal mengambil data hotel, menggunakan data dummy");
          setHotels(dummyData);
        }
      } catch (err) {
        console.log(err)
        setError("Terjadi kesalahan saat mengambil data, menggunakan data dummy");
        setHotels(dummyData);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [useApi]);

  return (
    <div>
      <div className="w-full h-full flex flex-col mb-16 mt-8">
        {/* Title */}
        <h1 className="font-bold text-[#1F2937] text-4xl mx-auto mt-2">
          Daftar Mitra Hotel
        </h1>

        <div className="border-t-4 w-[490px] mx-auto border-[#F5B041] mt-6"></div>

        {/* Container list hotel */}
        <div className="w-full mt-8 grid grid-cols-2 gap-x-3 gap-y-6">
          {loading ? (
            <div className="bg-white h-min-[154px] drop-shadow-md p-6 rounded-2xl flex flex-col text-center col-span-2">
              Memuat data...
            </div>
          ) : error ? (
            <div className="bg-white h-min-[154px] drop-shadow-md p-6 rounded-2xl flex flex-col text-center col-span-2">
              {error}
            </div>
          ) : hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <div
                key={index}
                className="bg-white h-min-[154px] drop-shadow-md p-6 rounded-2xl flex flex-col"
              >
                {/* Nama mitra */}
                <h1 className="text-xl">{hotel.name}</h1>
                <p className="text-base mt-2">Alamat</p>
                <p className="text-xs mt-1">{hotel.address}</p>
                <hr className="mt-4 border-t-2 border-black" />
                {/* Jumlah donasi (placeholder) */}
                <p className="ml-auto">x{Math.floor(Math.random() * 200) + 50} Donasi</p>
              </div>
            ))
          ) : (
            <div className="bg-white h-min-[154px] drop-shadow-md p-6 rounded-2xl flex flex-col text-center col-span-2">
              Tidak ada data ditemukan
            </div>
          )}
        </div>
      </div>
    </div>
  );
}