"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

export default function PageStatus() {
  const listStatus = ["Diproses", "Dikirim", "Diterima"];
  const listButtonTextStatus = ["Dikirim", "Diterima", "Selesai"];
  const [statusIndex, setStatusIndex] = useState(0);
  const router = useRouter();
  const { id } = useParams(); // Ambil ID dari URL
  const donationId = id;

  useEffect(() => {
    // Fetch status awal dari backend (optional, jika ingin sinkron)
    const fetchInitialStatus = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`https://intero-be.disyfa.cloud/api/donation/${donationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const status = data.data.status;
        const index = listStatus.indexOf(status);
        if (index >= 0) setStatusIndex(index);
      } catch (err) {
        console.error("Failed to fetch initial status", err);
      }
    };

    fetchInitialStatus();
  }, [statusIndex]);

  const handleStatus = async () => {
    const nextIndex = (statusIndex + 1) % listStatus.length;
    const nextStatus = listStatus[nextIndex];

    try {
      const token = Cookies.get("token");
      const res = await fetch(`https://intero-be.disyfa.cloud/api/donation/${donationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setStatusIndex(nextIndex);
      if (nextIndex === 2) router.push("/riwayat");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Gagal memperbarui status. Silakan coba lagi.");
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col gap-y-12 items-center">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-[36px] font-bold text-[#1F2937] mt-6">
          Status Pengiriman
        </h1>
        <div className="w-[491px] border-t-4 border-[#F5B041] mt-4"></div>
      </div>
      <div className="grid grid-cols-3 gap-x-64 w-full h-[250px]">
        {listStatus.map((status, i) => (
          <div
            key={i}
            className={`${statusIndex === i ? "bg-[#F5B041]" : "bg-[#2F5542]"
              } w-max aspect-square rounded-full text-[32px] text-white flex justify-center items-center`}
          >
            {status}
          </div>
        ))}
      </div>
      {statusIndex != 2 && (<button
        onClick={handleStatus}
        className="w-[651px] h-[105px] bg-[#F5B041] hover:opacity-80 rounded-[40px] text-[40px] text-white cursor-pointer"
      >
        {listButtonTextStatus[statusIndex]}
      </button>)

      }

    </div>
  );
}
