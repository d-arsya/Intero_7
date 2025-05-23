"use client";

import Image from "next/image";

export default function Register() {
    return (
        // container
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-[36px] font-bold text-[#1F2937]">Register</h1>
            <div className="w-[315px] border-t-4 border-[#F5B041] mt-4"></div>

            <div className="w-[1090px] h-[852px] grid grid-cols-2 mt-12 mb-8">
                {/* bagian kiri */}
                <div className="w-full h-[842px] bg-white rounded-2xl translate-x-4 z-10 drop-shadow-xl p-7">
                    <form action="" id="register-form" className="h-full w-full flex flex-col">
                        <label htmlFor="name" className="text-[20px] font-semibold text-[#1F2937]">Nama Pengguna</label>
                        <input type="name" name="name" id="name" className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4" placeholder="Nama Hotel / Resto / dsb" />

                        <label htmlFor="email" className="text-[20px] font-semibold text-[#1F2937] mt-4">Email</label>
                        <input type="email" name="email" id="email" className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4" placeholder="" />

                        <label htmlFor="nomor-telepon" className="text-[20px] font-semibold text-[#1F2937] mt-4">Nomor Telepon</label>
                        <input type="number" name="nomor-telepon" id="nomor-telepon" className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4" placeholder="" />

                        <label htmlFor="password" className="text-[20px] font-semibold text-[#1F2937] mt-4 block">Password</label>
                        <input type="password" name="password" id="password" className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4" placeholder="" />

                        <label htmlFor="confirm-password" className="text-[20px] font-semibold text-[#1F2937] mt-4 block">Konfirmasi Password</label>
                        <input type="password" name="confirm-password" id="confirm-password" className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4" placeholder="" />

                        <label htmlFor="tipe-donatur" className="text-[20px] font-semibold text-[#1F2937] mt-4 block">Konfirmasi Password</label>
                        <select name="tipe-donatur" id="tipe-donatur" className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4">
                            <option value="donatur">Donatur</option>
                        </select>

                        <input type="submit" value="Lanjut Daftar Akun" className="w-full h-[56px] bg-[#F5B041] hover:opacity-80 active:opacity-70 rounded-[8px] mt-auto text-white text-base font-medium" />
                    </form>
                </div>
                {/* bagian kanan */}
                <div className="w-full h-[842px] rounded-2xl -translate-x-4">
                    <Image width={10} height={10} src={"bg-register.svg"} alt="" className="w-full h-full object-fill" loading="lazy"/>
                </div>
            </div>
        </div>
        // end of container
    )
}