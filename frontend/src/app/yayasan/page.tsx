'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

// Interface untuk data yayasan
interface Foundation {
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  phone: string;
}

// Data dummy
const dummyData: Foundation[] = [
  {
    name: "Yayasan Kasih Sayang",
    latitude: "-7.12345",
    longitude: "110.12345",
    address: "Jl. Merdeka No. 1, Yogyakarta",
    phone: "+6281234567890",
  },
  {
    name: "Yayasan Harapan Baru",
    latitude: "-7.54321",
    longitude: "110.54321",
    address: "Jl. Sudirman No. 10, Yogyakarta",
    phone: "+6289876543210",
  },
  {
    name: "Yayasan Sejahtera",
    latitude: "-7.67890",
    longitude: "110.67890",
    address: "Jl. Malioboro No. 5, Yogyakarta",
    phone: "+6281122334455",
  },
];

// Fungsi untuk menghitung jarak menggunakan formula Haversine
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius bumi dalam km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Number(distance.toFixed(1));
};

export default function PageYayasan() {
  // State untuk data yayasan, search, sort, loading, dan error
  const [foundations, setFoundations] = useState<Foundation[]>(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "distance" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ganti dengan false untuk menggunakan dummy data tanpa fetch
//   const useApi = true;
  const useApi = false;

  // Koordinat pengguna (contoh: Yogyakarta)
  const userLocation = { lat: -7.7956, lon: 110.3695 };

  // Fetch data yayasan
  useEffect(() => {
    if (!useApi) {
      setLoading(false);
      return;
    }

    const fetchFoundations = async () => {
      try {
        const response = await fetch("https://intero-be.disyfa.cloud/api/foundations");
        const result = await response.json();
        if (result.success) {
          setFoundations(result.data);
        } else {
          setError("Gagal mengambil data yayasan, menggunakan data dummy");
          setFoundations(dummyData);
        }
      } catch (err) {
        console.log(err)
        setError("Terjadi kesalahan saat mengambil data, menggunakan data dummy");
        setFoundations(dummyData);
      } finally {
        setLoading(false);
      }
    };
    fetchFoundations();
  }, [useApi]);

  // Fungsi untuk filter berdasarkan pencarian
  const filteredFoundations = foundations.filter(
    (foundation) =>
      foundation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      foundation.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk sort data
  const sortedFoundations = [...filteredFoundations].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "distance") {
      const distanceA = calculateDistance(
        userLocation.lat,
        userLocation.lon,
        parseFloat(a.latitude),
        parseFloat(a.longitude)
      );
      const distanceB = calculateDistance(
        userLocation.lat,
        userLocation.lon,
        parseFloat(b.latitude),
        parseFloat(b.longitude)
      );
      return sortOrder === "asc" ? distanceA - distanceB : distanceB - distanceA;
    }
    return 0;
  });

  // Fungsi untuk toggle sort
  const handleSort = (criteria: "name" | "distance") => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full h-full flex flex-col mb-16 mt-8">
      {/* Title */}
      <h1 className="font-bold text-[#1F2937] text-4xl mx-auto mt-2">
        Daftar Yayasan
      </h1>

      <div className="border-t-4 w-[490px] mx-auto border-[#F5B041] mt-6"></div>

      {/* Sort and search container */}
      <div className="w-full h-[50px] flex items-center justify-end mt-6">
        <div className="text-xl font-semibold flex flex-row gap-4">
          <button onClick={() => handleSort("name")} className="flex items-center">
            <span>Sort by Name</span>
            <Image
              src="/sort.svg"
              width={100}
              height={100}
              alt="sort_icon"
              className="w-7 h-6 my-auto ml-3"
            />
          </button>
          <button onClick={() => handleSort("distance")} className="flex items-center">
            <span>Sort by Distance</span>
            <Image
              src="/sort.svg"
              width={100}
              height={100}
              alt="sort_icon"
              className="w-7 h-6 my-auto ml-3"
            />
          </button>
        </div>
        <input
          type="text"
          className="w-[220px] h-full border-[#D1D5DB] border bg-white rounded-[8px] ml-4 px-4 placeholder:translate-x-2"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Container list yayasan */}
      <div className="w-full mt-8 grid grid-cols-1 gap-y-6">
        {loading ? (
          <div className="bg-white min-h-[248px] w-full drop-shadow-md p-8 rounded-2xl flex flex-col text-center">
            Memuat data...
          </div>
        ) : error ? (
          <div className="bg-white min-h-[248px] w-full drop-shadow-md p-8 rounded-2xl flex flex-col text-center">
            {error}
          </div>
        ) : sortedFoundations.length > 0 ? (
          sortedFoundations.map((foundation, index) => (
            <div
              key={index}
              className="bg-white min-h-[248px] w-full drop-shadow-md p-8 rounded-2xl flex flex-col"
            >
              {/* Nama yayasan */}
              <h2 className="text-xl">{foundation.name}</h2>
              {/* Tanggal (contoh: tanggal saat ini) */}
              <p className="text-sm mt-2">
                {new Date().toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <hr className="mt-4 border-t-2 border-black" />
              <div className="flex flex-row justify-between mt-4">
                <p>Alamat</p>
                {/* Jarak */}
                <p>
                  {calculateDistance(
                    userLocation.lat,
                    userLocation.lon,
                    parseFloat(foundation.latitude),
                    parseFloat(foundation.longitude)
                  )} km
                </p>
              </div>
              <p>{foundation.address}</p>
              <button className="text-white bg-[#F5B041] rounded-full px-2 py-0.5 ml-auto">
                Donasi Sekarang
              </button>
            </div>
          ))
        ) : (
          <div className="bg-white min-h-[248px] w-full drop-shadow-md p-8 rounded-2xl flex flex-col text-center">
            Tidak ada data ditemukan
          </div>
        )}
      </div>
    </div>
  );
}