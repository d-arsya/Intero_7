import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-28 mb-56">
        <h1 className="text-4xl font-bold">Login</h1>
        <div className="w-[80px] border-t-4 border-[#F5B041] mt-4"></div>

        <div className="w-[817px] h-[541px] bg-white rounded-2xl drop-shadow-lg mt-10 px-8 py-12">
          <form action="" id="login-form" className="h-full w-full flex flex-col">
            <label htmlFor="email" className="text-[20px] font-semibold text-[#1F2937]">Email</label>
            <input type="email" name="email" id="email" className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4" placeholder="Nama Hotel / Resto / dsb" />

            <label htmlFor="password" className="text-[20px] font-semibold text-[#1F2937] mt-8 block">Password</label>
            <input type="password" name="password" id="password" className="w-full h-[50px] border border-[#ADAEBC] rounded-[8px] px-2 mt-4" placeholder="Masukan Password" />

            <Link href={"/register"} className="ml-auto mr-2 mt-5 text-[#F5B041] font-semibold hover:opacity-75">Register</Link>

            <input type="submit" value="Login" className="w-full h-[94px] bg-[#F5B041] hover:opacity-80 active:opacity-70 rounded-[8px] mt-auto text-white text-[32px] font-medium" />
          </form>
        </div>
      </div>
    </>
  );
}
