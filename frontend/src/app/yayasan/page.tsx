'use client';

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// Interface untuk data yayasan
interface Foundation {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  phone: string;
  distance: number;
}


export default function PageYayasan() {
  // State untuk data yayasan, search, sort, loading, dan error
  const [foundations, setFoundations] = useState<Foundation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data yayasan
  useEffect(() => {
    const fetchFoundations = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch("https://intero-be.disyfa.cloud/api/foundations", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.success) {
          setFoundations(result.data);
        } else {
          setError("Gagal mengambil data yayasan, menggunakan data dummy");
        }
      } catch (err) {
        console.log(err)
        setError("Terjadi kesalahan saat mengambil data, menggunakan data dummy");
      } finally {
        setLoading(false);
      }
    };
    fetchFoundations();
  }, []);


  const handleDonasiButton = async (id: number) => {
    try {
      const token = Cookies.get("token");

      const searchParams = new URLSearchParams(window.location.search);
      const formData = new FormData();

      // Tambahkan semua query params ke formData
      searchParams.forEach((value, key) => {
        formData.append(key, value);
      });

      // Tambahkan ID ke formData
      formData.append("foundation_id", String(id));

      const response = await fetch("https://intero-be.disyfa.cloud/api/donation", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim data.");
      }
      window.location.href = `/riwayat/${id}/status`;

    } catch (err) {
      alert("Gagal mengirim data: " + err);
    }
  };


  return (
    <div className="w-full h-full flex flex-col mb-16 mt-8">
      {/* Title */}
      <h1 className="font-bold text-[#1F2937] text-4xl mx-auto mt-2">
        Daftar Yayasan
      </h1>

      <div className="border-t-4 w-[490px] mx-auto border-[#F5B041] mt-6"></div>

      <div className="w-full mt-8 grid grid-cols-1 gap-y-6">
        {loading ? (
          <div className="bg-white min-h-[248px] w-full drop-shadow-md p-8 rounded-2xl flex flex-col text-center">
            Memuat data...
          </div>
        ) : error ? (
          <div className="bg-white min-h-[248px] w-full drop-shadow-md p-8 rounded-2xl flex flex-col text-center">
            {error}
          </div>
        ) : foundations.length > 0 ? (
          foundations.map((foundation) => (
            <div
              key={foundation.id}
              className="bg-white w-full drop-shadow-md p-8 rounded-2xl flex flex-col"
            >
              {/* Nama yayasan */}
              <h2 className="text-xl">{foundation.name}</h2>
              <hr className="mt-4 border-t-2 border-black" />
              <div className="flex flex-row justify-between mt-4">
                <p>Alamat</p>
                {/* Jarak */}
                <p>
                  {foundation.distance} km
                </p>
              </div>
              <p>{foundation.address}</p>
              <button onClick={() => handleDonasiButton(foundation.id)} className="text-white bg-[#F5B041] rounded-full px-2 py-0.5 ml-auto cursor-pointer">
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