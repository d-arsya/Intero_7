"use client";
import { ArrowLeft, Check, Info } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PageMakanan() {
  const [isShowingDonasiMakanan, setIsShowingDonasiMakanan] = useState(true);
  return (
    <div className="w-full h-full flex flex-col mb-16">
      {/* indikator */}
      <div className="w-fit h-fit flex flex-row items-start">
        <p className="text-sm text-[#1F2937] opacity-70">Beranda</p>
        <ChevronRight className="scale-75" />
        <p className="text-sm text-[#1F2937] opacity-70">Donasi</p>
      </div>

      {/* link balik ke beranda */}
      <Link href={"#"} className="flex flex-row mt-1">
        <ArrowLeft className="mr-2" />
        <p className="text-base font-bold text-[#F5B041]">Kembali ke beranda</p>
      </Link>

      {/* title */}
      <h1 className="font-bold text-[#1F2937] text-4xl mx-auto mt-2">
        Donasi Sekarang
      </h1>

      <div className="border-t-4 w-[80px] mx-auto border-[#F5B041] mt-4"></div>

      {/* text below title */}
      <h2 className="text-lg font-normal opacity-80 text-[#1F2937] mx-auto mt-5">
        Pilih jenis donasi yang ingin Anda berikan untuk mendukung misi kami
        dalam <br /> mengurangi limbah makanan dan membantu masyarakat yang
        membutuhkan.
      </h2>

      {/* split into 2 part container*/}
      <div className="grid grid-cols-2 gap-x-14 mt-10">
        {/* left side */}
        <div className="bg-white rounded-2xl p-7 shadow-xl">
          <h3 className="text-[#1F2937] text-xl font-bold">Jenis Donasi</h3>

          {/* button toggle container */}
          <div className="flex flex-row gap-x-2 h-[52px] font-medium mt-5">
            <button
              onClick={() => setIsShowingDonasiMakanan(false)}
              className={`${isShowingDonasiMakanan
                ? "border border-[#F9AF18] bg-white"
                : "bg-[#F9AF18] text-white"
                } rounded-[8px] flex-1 hover:opacity-90`}
            >
              Dana
            </button>
            <button
              onClick={() => setIsShowingDonasiMakanan(true)}
              className={`${isShowingDonasiMakanan
                ? "bg-[#F9AF18] text-white"
                : "border border-[#F9AF18] bg-white"
                } flex-1 bg-[#F9AF18] rounded-[8px] hover:opacity-90`}
            >
              Makanan
            </button>
          </div>
          {/* nampilin form donasi makanan */}
          {isShowingDonasiMakanan && (
            <>
              {/* instruksi */}
              <div className="w-full rounded-[8px] p-6 bg-[#E9EBE9] mt-5">
                <div className="flex flex-row gap-x-2 pl-1">
                  <Info color="#009CA6" />
                  <p className="text-black">
                    Pastikan makanan yang didonasikan:
                  </p>
                </div>
                <div className="flex flex-row mt-6 gap-x-2">
                  <Check color="#009CA6" />
                  <p>Masih layak konsumsi</p>
                </div>
                <div className="flex flex-row mt-2 gap-x-2">
                  <Check color="#009CA6" />
                  <p>Belum melewati tanggal kadaluarsa</p>
                </div>
                <div className="flex flex-row mt-2 gap-x-2">
                  <Check color="#009CA6" />
                  <p>Dalam kemasan yang baik</p>
                </div>
              </div>
              {/* start of form */}
              <form action="" className="w-full mt-6">
                {/* jenis makanan */}
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="jenis-makanan" className="font-medium">
                    Jenis Makanan
                  </label>
                  <select
                    name="jenis-makanan"
                    id="jenis-makanan"
                    className="border bg-white border-[#D1D5DB] h-[48px] rounded-[8px] px-2"
                  >
                    <option value="Pilih jenis makanan" disabled>
                      pilih jenis makanan
                    </option>
                    <option value="makanan siap saji">Makanan siap saji</option>
                    <option value="opsi2">opsi2</option>
                    <option value="opsi3">opsi3</option>
                    <option value="opsi4">opsi4</option>
                  </select>
                </div>
                {/* deskripsi makanan */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="deskripsi-makanan" className="font-medium">
                    Deskripsi Makanan
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#D1D5DB] h-[98px] rounded-[8px] resize-none p-2"
                    id="deskripsi-makanan"
                    name="deskripsi-makanan"
                    placeholder="Jelaskan detail makanan yang akan didonasikan"
                  ></textarea>
                </div>
                {/* perkiraan jumlah porsi */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="jumlah-porsi" className="font-medium">
                    Perkiraan Jumlah porsi
                  </label>
                  <input
                    type="number"
                    name="jumlah-porsi"
                    id="jumlah-porsi"
                    min={1}
                    className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                  ></input>
                </div>
                {/* tanggal pengambilan */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="tgl-pengambilan" className="font-medium">
                    Tanggal Pengambilan
                  </label>
                  <input
                    type="date"
                    name="tgl-pengambilan"
                    id="tgl-pengambilan"
                    min={1}
                    className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                    placeholder="DD/MM/YYYY"
                  ></input>
                </div>
                {/* waktu pengambilan */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="waktu-pengambilan" className="font-medium">
                    Waktu Pengambilan
                  </label>
                  <select
                    name="waktu-pengambilan"
                    id="waktu-pengambilan"
                    className="border bg-white border-[#D1D5DB] h-[48px] rounded-[8px] px-2"
                  >
                    <option value="Pilih jenis makanan" disabled>
                      pilih jenis makanan
                    </option>
                    <option value="09:00 - 11:00">09:00 - 11:00</option>
                    <option value="opsi2">opsi2</option>
                    <option value="opsi3">opsi3</option>
                    <option value="opsi4">opsi4</option>
                  </select>
                </div>
                {/* alamat pengambilan */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="alamat-pengambilan" className="font-medium">
                    Alamat Pengambilan
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#D1D5DB] h-[98px] rounded-[8px] resize-none p-2"
                    id="alamat-pengambilan"
                    name="alamat-pengambilan"
                  ></textarea>
                </div>
                {/* container two input */}
                <div className="flex flex-row gap-x-6">
                  {/* nama lengkap */}
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-col gap-y-2 mt-4">
                      <label htmlFor="nama-lengkap" className="font-medium">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="nama-lengkap"
                        id="nama-lengkap"
                        className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    {/* nomor telepon */}
                    <div className="flex flex-col gap-y-2 mt-4">
                      <label htmlFor="nomor-telpon" className="font-medium">
                        Nomor Telepon
                      </label>
                      <input
                        type="text" // gua bingung type nya apaan dah
                        name="nomor-telpon"
                        id="nomor-telpon"
                        className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                      ></input>
                    </div>
                  </div>
                </div>
                {/* catatan tambahan opsional */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="catatan-tambahan" className="font-medium">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#D1D5DB] h-[98px] rounded-[8px] resize-none p-2"
                    id="catatan-tambahan"
                    name="catatan-tambahan"
                    placeholder="Informasi tambahan yang perlu kami ketahui"
                  ></textarea>
                </div>
                <input
                  type="submit"
                  value="Ajukan Donasi Makanan"
                  className="w-full h-[56px] bg-[#F5B041] rounded-[8px] hover:opacity-90 mt-6 text-white font-medium"
                />
              </form>
              {/* end of form */}
            </>
          )}
          {/* nampilin form donasi dana */}
          {isShowingDonasiMakanan === false && (
            <>
              <form action="" className="w-full mt-6">
                {/* jumlah donasi */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="jumlah-donasi" className="font-medium">
                    Jumlah Donasi
                  </label>
                  <div className="flex flex-row gap-x-4">
                    <div className="h-[48px] bg-[#E9EBE9] rounded-[8px] justify-center items-center flex flex-1 cursor-pointer hover:opacity-90">
                      <p>Rp 50.000</p>
                    </div>
                    <div className="h-[48px] bg-[#E9EBE9] rounded-[8px] justify-center items-center flex flex-1 cursor-pointer hover:opacity-90">
                      <p>Rp 100.000</p>
                    </div>
                    <div className="h-[48px] bg-[#E9EBE9] rounded-[8px] justify-center items-center flex flex-1 cursor-pointer hover:opacity-90">
                      <p>Rp 200.000</p>
                    </div>
                  </div>
                  <input
                    type="number"
                    name="jumlah-donasi"
                    id="jumlah-porsi"
                    min={1}
                    className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2 mt-2"
                    placeholder="Jumlah Lainnya"
                  ></input>
                </div>
                {/* nama lengkao */}
                <div className="flex flex-col gap-y-2 mt-6">
                  <label htmlFor="nama-lengkap" className="font-medium">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama-lengkap"
                    id="nama-lengkap"
                    className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                  ></input>
                </div>
                {/* email */}
                <div className="flex flex-col gap-y-2 mt-6">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                  ></input>
                </div>
                <div className="flex flex-col gap-y-2 mt-6">
                  <label htmlFor="nomor-telepon" className="font-medium">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="nomor-telepon"
                    id="nomor-telepon"
                    className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                  ></input>
                </div>
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="pesan" className="font-medium">
                    Pesan (Opsional)
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#D1D5DB] h-[98px] rounded-[8px] resize-none p-2"
                    id="pesan"
                    name="pesan"
                  ></textarea>
                </div>
                <input
                  type="submit"
                  value="Donasi Sekarang"
                  className="w-full h-[56px] bg-[#F5B041] rounded-[8px] hover:opacity-90 mt-6 text-white font-medium"
                />
              </form>
            </>
          )}
        </div>
        {/* right side */}
        <div className="bg-[#344C36] rounded-2xl p-7">
          {/* nampilin informasi donasi dana */}
          {isShowingDonasiMakanan && (
            <>
              <h3 className="text-2xl font-bold text-white">
                Donasi Anda Berdampak
              </h3>

              {/* start of list information */}
              <div className="flex flex-col gap-y-6 mt-6">
                {/* row 1 */}
                <div className="bg-[#485E4A] h-[116px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="w-[45px] h-[45px] rounded-full bg-[#E0F7FA]">
                      {/* taruh icon disini */}
                    </div>
                  </div>
                  <div className="w-5/6 flex flex-col justify-center gap-y-0.5">
                    <p className="text-white text-lg font-semibold">
                      1.2 Juta+ Porsi
                    </p>
                    <p className="text-white opacity-80">
                      Makanan telah diselamatkan
                    </p>
                  </div>
                </div>
                {/* row 2 */}
                <div className="bg-[#485E4A] h-[116px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="w-[45px] h-[45px] rounded-full bg-[#E0F7FA]">
                      {/* taruh icon disini */}
                    </div>
                  </div>
                  <div className="w-5/6 flex flex-col justify-center gap-y-0.5">
                    <p className="text-white text-lg font-semibold">
                      50.000+ Penerima
                    </p>
                    <p className="text-white opacity-80">
                      Manfaat bantuan makanan
                    </p>
                  </div>
                </div>
                {/* row 3 */}
                <div className="bg-[#485E4A] h-[116px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="w-[45px] h-[45px] rounded-full bg-[#E0F7FA]">
                      {/* taruh icon disini */}
                    </div>
                  </div>
                  <div className="w-5/6 flex flex-col justify-center gap-y-0.5">
                    <p className="text-white text-lg font-semibold">
                      200+ Mitra
                    </p>
                    <p className="text-white opacity-80">
                      Donatur makanan aktif
                    </p>
                  </div>
                </div>
              </div>
              {/* end of list information */}

              {/* quote? */}
              <div className="w-full h-[208px] flex flex-col bg-[#F5B041] mt-6 p-6 rounded-[12px]">
                <p className="text-sm text-[#344C36]">
                  &quot;Setiap donasi makanan yang Anda berikan tidak hanya <br />
                  menyelamatkan makanan dari pembuangan, tetapi juga <br />
                  memberikan harapan dan bantuan nyata bagi mereka <br />
                  yang membutuhkan.&quot;
                </p>

                <div className="flex flex-row mt-auto">
                  <div className="w-[15%] flex justify-center items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-400">.</div>
                    {/* <div className='w-12 h-12 rounded-full bg-[url("/test.png")]'>.</div> */}
                  </div>
                  <div className="w-[85%] flex flex-col justify-center">
                    <p className="text-base font-medium text-[#344C36]">
                      Bu Ika
                    </p>
                    <p className="text-[#344C36] text-sm">
                      Koordinator Program BBJ
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {isShowingDonasiMakanan === false && (
            <>
              <h3 className="text-2xl font-bold text-white">
                Donasi Anda Berdampak
              </h3>

              {/* start of list information */}
              <div className="flex flex-col gap-y-4 mt-6">
                {/* rp 50.000 */}
                <div className="bg-[#2F5542] h-[112px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="w-[45px] h-[45px] rounded-full bg-[#E0F7FA]">
                      {/* taruh icon disini */}
                    </div>
                  </div>
                  <div className="w-5/6 flex flex-col justify-center gap-y-1.5">
                    <p className="text-white text-xl font-bold">Rp 50.000</p>
                    <p className="text-white opacity-80">
                      Membantu menyelamatkan dan mendistribusikan 10 porsi
                      makanan
                    </p>
                  </div>
                </div>
                {/* rp 100.000 */}
                <div className="bg-[#2F5542] h-[112px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="w-[45px] h-[45px] rounded-full bg-[#E0F7FA]">
                      {/* taruh icon disini */}
                    </div>
                  </div>
                  <div className="w-5/6 flex flex-col justify-center gap-y-1.5">
                    <p className="text-white text-xl font-bold">Rp 100.000</p>
                    <p className="text-white opacity-80">
                      Mendukung biaya transportasi untuk satu rute pengambilan
                      makanan
                    </p>
                  </div>
                </div>
                {/* rp 200.000 */}
                <div className="bg-[#2F5542] h-[112px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="w-[45px] h-[45px] rounded-full bg-[#E0F7FA]">
                      {/* taruh icon disini */}
                    </div>
                  </div>
                  <div className="w-5/6 flex flex-col justify-center gap-y-1.5">
                    <p className="text-white text-xl font-bold">Rp 200.000</p>
                    <p className="text-white opacity-80">
                      Membiayai peralatan penyimpanan makanan yang aman dan
                      bebas kontaminan
                    </p>
                  </div>
                </div>
              </div>
              {/* end of list information */}

              <div className="bg-white border-t mt-7 opacity-40"></div>

              {/* two info container */}
              <div className="flex flex-row gap-x-6 mt-7">
                <div className="flex-1 flex flex-col bg-[#2F5542] rounded-[8px] p-4">
                  <h4 className="font-medium text-white">
                    Total Makanan <br />
                    Terselamatkan
                  </h4>
                  <p className="text-2xl font-bold text-white">12,450 kg</p>
                </div>
                <div className="flex-1 flex flex-col bg-[#2F5542] rounded-[8px] p-4">
                  <h4 className="font-medium text-white">Penerima Manfaat</h4>
                  <p className="text-2xl font-bold text-white">5,230 orang</p>
                </div>
              </div>

              {/* metode pembayaran */}
              <p className="text-white font-bold mt-4">Metode Pembayaran:</p>

              {/* list logo */}
              <div className="flex-1 flex flex-row bg-[#2F5542] rounded-[8px] p-2 mt-2">
                {/* icon-icon */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
