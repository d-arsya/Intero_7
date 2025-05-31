'use client';

import Image from "next/image";
import { useState } from "react";

// Interface untuk data riwayat donasi
interface Donation {
  id: number;
  namaYayasan: string;
  tanggal: string;
  status: string;
  namaMakanan: string;
  porsi: number;
  deskripsi: string;
}

// Data dummy
const dummyData: Donation[] = [
  {
    id: 1,
    namaYayasan: "Yayasan Kasih Sayang",
    tanggal: "23/05/2025",
    status: "Sukses",
    namaMakanan: "Mie Ayam",
    porsi: 200,
    deskripsi: "Donasi mie ayam untuk anak-anak panti asuhan.",
  },
  {
    id: 2,
    namaYayasan: "Yayasan Harapan Baru",
    tanggal: "15/04/2025",
    status: "Pending",
    namaMakanan: "Nasi Goreng",
    porsi: 150,
    deskripsi: "Donasi nasi goreng untuk kegiatan sosial masyarakat.",
  },
  {
    id: 3,
    namaYayasan: "Yayasan Sejahtera",
    tanggal: "10/03/2025",
    status: "Sukses",
    namaMakanan: "Soto Ayam",
    porsi: 100,
    deskripsi: "Donasi soto ayam untuk acara amal.",
  },
];

export default function PageRiwayat() {
  // State untuk search, sort, dan data yang ditampilkan
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"tanggal" | "status" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fungsi untuk handle search
  const filteredData = dummyData.filter(
    (donation) =>
      donation.namaYayasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.namaMakanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk handle sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "tanggal") {
      const dateA = new Date(a.tanggal.split("/").reverse().join("-"));
      const dateB = new Date(b.tanggal.split("/").reverse().join("-"));
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    } else if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  // Fungsi untuk toggle sort
  const handleSort = (criteria: "tanggal" | "status") => {
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
        Riwayat Donasi
      </h1>

      <div className="border-t-4 w-[490px] mx-auto border-[#F5B041] mt-6"></div>

      {/* Sort and search container */}
      <div className="w-full h-[50px] flex items-center justify-end mt-6">
        <div className="text-xl font-semibold flex flex-row gap-4">
          <button
            onClick={() => handleSort("tanggal")}
            className="flex items-center"
          >
            <span>Sort by Date</span>
            <Image
              src="/sort.svg"
              width={100}
              height={100}
              alt="sort_icon"
              className="w-7 h-6 my-auto ml-3"
            />
          </button>
          <button
            onClick={() => handleSort("status")}
            className="flex items-center"
          >
            <span>Sort by Status</span>
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

      {/* Container list riwayat */}
      <div className="w-full mt-8 grid grid-cols-1 gap-y-6">
        {sortedData.length > 0 ? (
          sortedData.map((donation) => (
            <div
              key={donation.id}
              className="bg-white min-h-[320px] w-full drop-shadow-md p-8 rounded-2xl"
            >
              {/* Nama yayasan */}
              <h1 className="text-xl font-bold">{donation.namaYayasan}</h1>
              <div className="flex w-full justify-between">
                {/* Tanggal */}
                <p>{donation.tanggal}</p>
                {/* Status */}
                <div
                  className={`rounded-full px-2 py-0.5 ${
                    donation.status === "Sukses"
                      ? "bg-[#E8FADC] text-[#72E128]"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {donation.status}
                </div>
              </div>
              <hr className="mt-4 border-t-2 border-black" />
              <div className="flex flex-row justify-between mt-4">
                {/* Nama makanan */}
                <p>{donation.namaMakanan}</p>
                {/* Porsi */}
                <p>x{donation.porsi} Porsi</p>
              </div>
              <h2 className="mt-4 font-semibold">Deskripsi</h2>
              <p>{donation.deskripsi}</p>
            </div>
          ))
        ) : (
          <div className="bg-white min-h-[320px] w-full drop-shadow-md p-8 text-center">
            Tidak ada data ditemukan
          </div>
        )}
      </div>
    </div>
  );
}