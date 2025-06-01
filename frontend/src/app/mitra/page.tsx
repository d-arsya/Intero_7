'use client';

import { useState, useEffect } from "react";

interface Hotel {
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  donations_count: number;
}

export default function PageMitra() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchHotels = async () => {
      try {
        const response = await fetch("https://intero-be.disyfa.cloud/api/hotels");
        const result = await response.json();
        if (result.code === 200) {
          setHotels(result.data);
        } else {
          setError("Gagal mengambil data mitra");
        }
      } catch (err) {
        setError("Gagal mengambil data mitra :" + err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

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
                <h1 className="text-xl">{hotel.name}</h1>
                <p className="text-base mt-2">Alamat</p>
                <p className="text-xs mt-1">{hotel.address}</p>
                <hr className="mt-4 border-t-2 border-black" />
                <p className="ml-auto">x{hotel.donations_count} Donasi</p>
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