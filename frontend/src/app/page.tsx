"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error sebelum mencoba login
    console.log(email,password)

    try {
      const response = await fetch("https://intero-be.disyfa.cloud/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log("API Response:", JSON.stringify(data, null, 2));

      if (response.ok && data.data?.token) {
        document.cookie = `token=${data.data.token}; path=/; max-age=86400; SameSite=Strict`;
        console.log("Cookie set:", document.cookie);
        window.location.href = "/donasi";
      } else {
        setError(data.message || "Login gagal. Periksa email dan password Anda.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-28 mb-56">
      <h1 className="text-4xl font-bold">Login</h1>
      <div className="w-[80px] border-t-4 border-[#F5B041] mt-4"></div>

      {error && (
        <div className="w-[817px] mt-4 text-red-500 text-center">{error}</div>
      )}

      <div className="w-[817px] h-[541px] bg-white rounded-2xl drop-shadow-lg mt-10 px-8 py-12">
        <form onSubmit={handleLogin} id="login-form" className="h-full w-full flex flex-col">
          <label htmlFor="email" className="text-[20px] font-semibold text-[#1F2937]">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Perbaikan: gunakan e.target.value
          />

          <label
            htmlFor="password"
            className="text-[20px] font-semibold text-[#1F2937] mt-8 block"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Perbaikan: gunakan e.target.value
          />

          <Link
            href="/register"
            className="ml-auto mr-2 mt-5 text-[#F5B041] font-semibold hover:opacity-75"
          >
            Register
          </Link>

          <input
            type="submit"
            value="Login"
            className="w-full h-[94px] bg-[#F5B041] hover:opacity-80 active:opacity-70 rounded-[8px] mt-auto text-white text-[32px] font-medium"
          />
        </form>
      </div>
    </div>
  );
}