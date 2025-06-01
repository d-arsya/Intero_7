"use client";
import { useState } from "react";

export default function PageStatus() {
  const listStatus = ["Diproses", "Dikirim", "Tiba di tujuan"];
  const listButtonTextStatus = ["Dikirim", "Dikirim", "Selesai"];

  const [statusIndex, setStatusIndex] = useState(0);

  const handleStatus = () => {
    const nextIndex = (statusIndex + 1) % listStatus.length;
    setStatusIndex(nextIndex);
  };

  const handleSelesai = () => {
    window.location.href = "/riwayat";
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-around items-center">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-[36px] font-bold text-[#1F2937] mt-6">
          Status Pengiriman
        </h1>
        <div className="w-[491px] border-t-4 border-[#F5B041] mt-4"></div>
      </div>
      <div className="grid grid-cols-3 gap-x-64 w-full h-[250px]">
        <div
          className={`${
            statusIndex === 0 ? "bg-[#F5B041]" : "bg-[#2F5542]"
          } w-full h-full rounded-full text-[32px] text-white flex justify-center items-center`}
        >
          Diproses
        </div>
        <div
          className={`${
            statusIndex === 1 ? "bg-[#F5B041]" : "bg-[#2F5542]"
          } w-full h-full rounded-full text-[32px] text-white flex justify-center items-center`}
        >
          Dikirim
        </div>
        <div
          className={`${
            statusIndex === 2 ? "bg-[#F5B041]" : "bg-[#2F5542]"
          } w-full h-full rounded-full text-[32px] text-white flex justify-center items-center`}
        >
          Tiba di tujuan
        </div>
      </div>
      <button
        onClick={() => {
          handleStatus();
          if (statusIndex === 2) {
            handleSelesai();
          }
        }}
        className="w-[651px] h-[105px] bg-[#F5B041] hover:opacity-80 rounded-[40px] text-[40px] text-white cursor-pointer  "
      >
        {listButtonTextStatus[statusIndex]}
      </button>
    </div>
  );
}
