"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const MapPicker = dynamic(() => import("@/components/MapPicker"), {
    ssr: false,
  });

  const [position, setPosition] = useState({ lat: -7.797068, lng: 110.370529 }); // Jogja

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    latitude: -7.797068,
    longitude: 110.370529,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      latitude: position.lat,
      longitude: position.lng,
    }));
  }, [position]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("https://intero-be.disyfa.cloud/api/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        window.location.href = "/"; // Redirect ke donasi
      } else {
        setError("Registrasi gagal. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-[36px] font-bold text-[#1F2937] mt-6">Register</h1>
      <div className="w-[315px] border-t-4 border-[#F5B041] mt-4"></div>

      <div className="w-[1090px] h-[852px] grid grid-cols-2 mt-12 mb-8">
        <div className="w-full h-[842px] bg-white rounded-2xl translate-x-4 z-10 drop-shadow-xl p-7">
          <form
            onSubmit={handleSubmit}
            id="register-form"
            className="h-full w-full flex flex-col"
          >
            <label
              htmlFor="name"
              className="text-[20px] font-semibold text-[#1F2937]"
            >
              Nama Pengguna
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
              placeholder="Nama Hotel / Resto / dsb"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
            />

            <label
              htmlFor="email"
              className="text-[20px] font-semibold text-[#1F2937] mt-4"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
              placeholder="Masukkan email Anda"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
            />

            <label
              htmlFor="phone"
              className="text-[20px] font-semibold text-[#1F2937] mt-4"
            >
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
              placeholder="Masukkan nomor telepon"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              value={form.phone}
            />

            <label
              htmlFor="password"
              className="text-[20px] font-semibold text-[#1F2937] mt-4 block"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
              placeholder="Masukkan password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
            />

            <label
              htmlFor="address"
              className="text-[20px] font-semibold text-[#1F2937] mt-4 block"
            >
              address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
              placeholder="address"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              value={form.address}
            />

            <input
              type="submit"
              value={isLoading ? "Menyimpan..." : "Simpan"}
              className="w-full h-[56px] bg-[#F5B041] hover:opacity-80 active:opacity-70 rounded-[8px] mt-auto text-white text-base font-medium"
              disabled={isLoading}
            />
          </form>
        </div>
        <div className="w-full h-[842px] rounded-2xl -translate-x-4">
          <MapPicker position={position} setPosition={setPosition} />
        </div>
      </div>

      {error && (
        <div className="w-[1090px] mt-4 mb-6 text-red-500 text-center">{error}</div>
      )}
    </div>
  );
}