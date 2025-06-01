'use client';

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

// Interface untuk data riwayat donasi
interface Donation {
  id: number;
  foundation_name: string;
  take: string;
  status: string;
  portion: number;
  description: string;
}

export default function PageRiwayat() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchDonations = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch("https://intero-be.disyfa.cloud/api/donation", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        const result = await response.json();
        if (result.code === 200) {
          setDonations(result.data);
        } else {
          setError("Gagal mengambil data donasi");
        }
      } catch (err) {
        setError("Gagal mengambil data donasi : " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="w-full h-full flex flex-col mb-16 mt-8">
      {/* Title */}
      <h1 className="font-bold text-[#1F2937] text-4xl mx-auto mt-2">
        Riwayat Donasi
      </h1>

      {/* Container list riwayat */}
      <div className="w-full mt-8 grid grid-cols-1 gap-y-6">
        {loading ? (
          <div className="bg-white h-min-[154px] drop-shadow-md p-6 rounded-2xl flex flex-col text-center col-span-2">
            Memuat data...
          </div>
        ) : donations.length > 0 ? (
          donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white w-full drop-shadow-md p-8 rounded-2xl"
            >
              {/* Nama yayasan */}
              <Link href={`/riwayat/${donation.id}/status`} className="text-xl font-bold">{donation.foundation_name}</Link>
              <div className="flex w-full justify-between">
                {/* take */}
                <p>{donation.take}</p>
                {/* Status */}
                <div
                  className={`rounded-full px-2 py-0.5 ${donation.status === "Sukses"
                    ? "bg-[#E8FADC] text-[#72E128]"
                    : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  {donation.status}
                </div>
              </div>
              <hr className="mt-4 border-t-2 border-black" />
              <div className="flex flex-row justify-between mt-4">
                <p>x{donation.portion} Porsi</p>
              </div>
              <h2 className="mt-4 font-semibold">Deskripsi</h2>
              <p>{donation.description}</p>
            </div>
          ))
        ) : (
          <div className="bg-white min-h-[320px] w-full drop-shadow-md p-8 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}