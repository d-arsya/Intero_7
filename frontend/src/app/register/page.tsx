"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export default function Register() {
  const [step, setStep] = useState(1);

  const MapPicker = dynamic(() => import("@/components/MapPicker"), {
    ssr: false,
  });

  const [position, setPosition] = useState({ lat: -7.797068, lng: 110.370529 }); // Jogja

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    tipeDonatur: "donatur",

    provinsi: "",
    kota: "",
    kecamatan: "",
    kodePos: "",
    alamat: "",
    detail: "",
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

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", form);
    console.log("Location:", position);
    // kirim ke API atau tampilkan alert dll
  };

  return (
    // container
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-[36px] font-bold text-[#1F2937]">Register</h1>
      <div className="w-[315px] border-t-4 border-[#F5B041] mt-4"></div>

      {step === 1 && (
        <div className="w-[1090px] h-[852px] grid grid-cols-2 mt-12 mb-8">
          {/* bagian kiri */}
          <div className="w-full h-[842px] bg-white rounded-2xl translate-x-4 z-10 drop-shadow-xl p-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              action=""
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
                type="name"
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
                placeholder=""
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
                type="number"
                name="phone"
                id="phone"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                placeholder=""
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
                placeholder=""
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
              />

              <label
                htmlFor="confirmPassword"
                className="text-[20px] font-semibold text-[#1F2937] mt-4 block"
              >
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                placeholder=""
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                value={form.confirmPassword}
              />

              <label
                htmlFor="tipeDonatur"
                className="text-[20px] font-semibold text-[#1F2937] mt-4 block"
              >
                tipeDonatur
              </label>
              <select
                name="tipeDonatur"
                id="tipeDonatur"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                onChange={(e) =>
                  setForm({ ...form, tipeDonatur: e.target.value })
                }
              >
                <option value="donatur">Donatur</option>
              </select>

              <button
                // onClick={() => setStep(2)}
                // value="Lanjut Daftar Akun"
                className="w-full h-[56px] bg-[#F5B041] hover:opacity-80 active:opacity-70 rounded-[8px] mt-auto text-white text-base font-medium"
              >
                Lanjut Daftar Akun
              </button>
            </form>
          </div>
          {/* bagian kanan */}
          <div className="w-full h-[842px] rounded-2xl -translate-x-4">
            <Image
              width={10}
              height={10}
              src={"bg-register.svg"}
              alt=""
              className="w-full h-full object-fill"
              loading="eager"
            />
          </div>
        </div>
      )}

      {step == 2 && (
        <div className="w-[1090px] h-[852px] grid grid-cols-2 mt-12 mb-8">
          {/* bagian kiri */}
          <div className="w-full h-[842px] bg-white rounded-2xl translate-x-4 z-10 drop-shadow-xl p-7">
            <form
              action=""
               onSubmit={handleSubmit}
              id="register-form-location"
              className="h-full w-full flex flex-col"
            >
              <label
                htmlFor="provinsi"
                className="text-[20px] font-semibold text-[#1F2937]"
              >
                Provinsi
              </label>
              <input
                type="text"
                name="provinsi"
                id="provinsi"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                placeholder="Nama Hotel / Resto / dsb"
                value={form.provinsi}
                onChange={(e) => setForm({ ...form, provinsi: e.target.value })}
              />

              <label
                htmlFor="kota"
                className="text-[20px] font-semibold text-[#1F2937] mt-4"
              >
                Kota
              </label>
              <input
                type="text"
                name="kota"
                id="kota"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                placeholder=""
                value={form.kota}
                onChange={(e) => setForm({ ...form, kota: e.target.value })}
              />

              <label
                htmlFor="kecamatan"
                className="text-[20px] font-semibold text-[#1F2937] mt-4"
              >
                Kecamatan
              </label>
              <input
                type="text"
                name="kecamatan"
                id="kecamatan"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                placeholder=""
                value={form.kecamatan}
                onChange={(e) =>
                  setForm({ ...form, kecamatan: e.target.value })
                }
              />

              <label
                htmlFor="kodePos"
                className="text-[20px] font-semibold text-[#1F2937] mt-4 block"
              >
                Kode Pos
              </label>
              <input
                type="text"
                name="kodePos"
                id="kodePos"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                placeholder=""
                value={form.kodePos}
                onChange={(e) => setForm({ ...form, kodePos: e.target.value })}
              />

              <label
                htmlFor="alamat"
                className="text-[20px] font-semibold text-[#1F2937] mt-4 block"
              >
                Nama Jalan, Gedung, No.Rumah
              </label>
              <input
                type="text"
                name="alamat"
                id="alamat"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                placeholder=""
                value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              />

              <label
                htmlFor="detail"
                className="text-[20px] font-semibold text-[#1F2937] mt-4 block"
              >
                Detail lainnya
              </label>
              <input
                type="text"
                name="detail"
                id="detail"
                className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
                placeholder="optional"
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
              />

              <input
                type="submit"
                value="Simpan"
                className="w-full h-[56px] bg-[#F5B041] hover:opacity-80 active:opacity-70 rounded-[8px] mt-auto text-white text-base font-medium"
              />
            </form>
          </div>
          {/* bagian kanan */}
          <div className="w-full h-[842px] rounded-2xl -translate-x-4">
            <MapPicker position={position} setPosition={setPosition} />
          </div>
        </div>
      )}
    </div>
    // end of container
  );
}