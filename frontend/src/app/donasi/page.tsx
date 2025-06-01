'use client';

import { Check, Info } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PageMakanan() {
  const [isShowingDonasiMakanan] = useState(true);
  const router = useRouter();

  // State untuk form data
  const [formData, setFormData] = useState({
    foodType: '',
    description: '',
    portions: '',
    pickupDate: '',
    pickupTime: '',
    pickupAddress: '',
    notes: '',
  });

  // Handler untuk perubahan input form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.foodType || !formData.description || !formData.portions || !formData.pickupDate || !formData.pickupTime || !formData.pickupAddress) {
      alert('Harap isi semua kolom wajib!');
      return;
    }

    // Buat query string dari form data
    const query = new URLSearchParams({
      foodType: formData.foodType,
      description: formData.description,
      portions: formData.portions,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      pickupAddress: formData.pickupAddress,
      notes: formData.notes || '',
    }).toString();

    // Redirect ke /yayasan dengan query string
    router.push(`/yayasan?${query}`);

    // Opsional: Kirim data ke API (jika ada endpoint)
    /*
    try {
      const response = await fetch('https://your-api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push(`/yayasan?${query}`);
      } else {
        alert('Gagal mengirim donasi. Silakan coba lagi.');
      }
    } catch (err) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
    */
  };

  return (
    <div className="w-full h-full flex flex-col mb-16 mt-8">
      {/* Title */}
      <h1 className="font-bold text-[#1F2937] text-4xl mx-auto mt-2">
        Donasi Sekarang
      </h1>

      <div className="border-t-4 w-[80px] mx-auto border-[#F5B041] mt-4"></div>

      {/* Text below title */}
      <h2 className="text-lg font-normal opacity-80 text-[#1F2937] mx-auto mt-5">
        Pilih jenis donasi yang ingin Anda berikan untuk mendukung misi kami
        dalam <br /> mengurangi limbah makanan dan membantu masyarakat yang
        membutuhkan.
      </h2>

      {/* Split into 2 part container */}
      <div className="grid grid-cols-2 gap-x-14 mt-10">
        {/* Left side */}
        <div className="bg-white rounded-2xl p-7 shadow-xl">
          {isShowingDonasiMakanan && (
            <>
              {/* Instruksi */}
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
              {/* Start of form */}
              <form onSubmit={handleSubmit} className="w-full mt-6">
                {/* Jenis makanan */}
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="jenis-makanan" className="font-medium">
                    Jenis Makanan
                  </label>
                  <select
                    name="foodType"
                    id="jenis-makanan"
                    className="border bg-white border-[#D1D5DB] h-[48px] rounded-[8px] px-2"
                    value={formData.foodType}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Pilih jenis makanan
                    </option>
                    <option value="makanan-siap-saji">Makanan siap saji</option>
                    <option value="opsi2">Opsi 2</option>
                    <option value="opsi3">Opsi 3</option>
                    <option value="opsi4">Opsi 4</option>
                  </select>
                </div>
                {/* Deskripsi makanan */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="deskripsi-makanan" className="font-medium">
                    Deskripsi Makanan
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#D1D5DB] h-[98px] rounded-[8px] resize-none p-2"
                    id="deskripsi-makanan"
                    name="description"
                    placeholder="Jelaskan detail makanan yang akan didonasikan"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                {/* Perkiraan jumlah porsi */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="jumlah-porsi" className="font-medium">
                    Perkiraan Jumlah Porsi
                  </label>
                  <input
                    type="number"
                    name="portions"
                    id="jumlah-porsi"
                    min={1}
                    className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                    value={formData.portions}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Tanggal pengambilan */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="tgl-pengambilan" className="font-medium">
                    Tanggal Pengambilan
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    id="tgl-pengambilan"
                    className="w-full bg-white border border-[#D1D5DB] h-[50px] rounded-[8px] resize-none p-2"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Waktu pengambilan */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="waktu-pengambilan" className="font-medium">
                    Waktu Pengambilan
                  </label>
                  <select
                    name="pickupTime"
                    id="waktu-pengambilan"
                    className="border bg-white border-[#D1D5DB] h-[48px] rounded-[8px] px-2"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Pilih waktu pengambilan
                    </option>
                    <option value="09:00-11:00">09:00 - 11:00</option>
                    <option value="opsi2">Opsi 2</option>
                    <option value="opsi3">Opsi 3</option>
                    <option value="opsi4">Opsi 4</option>
                  </select>
                </div>
                {/* Alamat pengambilan */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="alamat-pengambilan" className="font-medium">
                    Alamat Pengambilan
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#D1D5DB] h-[98px] rounded-[8px] resize-none p-2"
                    id="alamat-pengambilan"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                {/* Catatan tambahan opsional */}
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="catatan-tambahan" className="font-medium">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#D1D5DB] h-[98px] rounded-[8px] resize-none p-2"
                    id="catatan-tambahan"
                    name="notes"
                    placeholder="Informasi tambahan yang perlu kami ketahui"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <input
                  type="submit"
                  value="Ajukan Donasi Makanan"
                  className="w-full h-[56px] bg-[#F5B041] rounded-[8px] hover:opacity-90 mt-6 text-white font-medium"
                />
              </form>
              {/* End of form */}
            </>
          )}
        </div>
        {/* Right side */}
        <div className="bg-[#344C36] rounded-2xl p-7">
          {isShowingDonasiMakanan && (
            <>
              <h3 className="text-2xl font-bold text-white">
                Donasi Anda Berdampak
              </h3>
              {/* Start of list information */}
              <div className="flex flex-col gap-y-6 mt-6">
                {/* Row 1 */}
                <div className="bg-[#485E4A] h-[116px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="flex w-[45px] h-[45px] rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="m-auto"
                      >
                        <path
                          d="M8.25 1.5C10.3219 1.5 12 3.17812 12 5.25V6C12 6.4125 11.6625 6.75 11.25 6.75C9.17813 6.75 7.5 5.07188 7.5 3V2.25C7.5 1.8375 7.8375 1.5 8.25 1.5ZM2.625 3H4.875C5.49844 3 6 3.50156 6 4.125C6 4.74844 5.49844 5.25 4.875 5.25H2.625C2.00156 5.25 1.5 4.74844 1.5 4.125C1.5 3.50156 2.00156 3 2.625 3ZM1.125 6.375H6.375C6.99844 6.375 7.5 6.87656 7.5 7.5C7.5 8.12344 6.99844 8.625 6.375 8.625H1.125C0.501562 8.625 0 8.12344 0 7.5C0 6.87656 0.501562 6.375 1.125 6.375ZM1.5 10.875C1.5 10.2516 2.00156 9.75 2.625 9.75H4.875C5.49844 9.75 6 10.2516 6 10.875C6 11.4984 5.49844 12 4.875 12H2.625C2.00156 12 1.5 11.4984 1.5 10.875ZM12.75 2.25C12.75 1.8375 13.0875 1.5 13.5 1.5C15.5719 1.5 17.25 3.17812 17.25 5.25V6C17.25 6.4125 16.9125 6.75 16.5 6.75C14.4281 6.75 12.75 5.07188 12.75 3V2.25ZM18.75 1.5C20.8219 1.5 22.5 3.17812 22.5 5.25V6C22.5 6.4125 22.1625 6.75 21.75 6.75C19.6781 6.75 18 5.07188 18 3V2.25C18 1.8375 18.3375 1.5 18.75 1.5ZM22.5 9V9.75C22.5 11.8219 20.8219 13.5 18.75 13.5C18.3375 13.5 18 13.1625 18 12.75V12C18 9.92813 19.6781 8.25 21.75 8.25C22.1625 8.25 22.5 8.5875 22.5 9ZM16.5 8.25C16.9125 8.25 17.25 8.5875 17.25 9V9.75C17.25 11.8219 15.5719 13.5 13.5 13.5C13.0875 13.5 12.75 13.1625 12.75 12.75V12C12.75 9.92813 14.4281 8.25 16.5 8.25ZM12 9V9.75C12 11.8219 10.3219 13.5 8.25 13.5C7.8375 13.5 7.5 13.1625 7.5 12.75V12C7.5 9.92813 9.17813 8.25 11.25 8.25C11.6625 8.25 12 8.5875 12 9ZM0.164062 16.2938C0.075 15.6047 0.609375 15 1.30312 15H22.6969C23.3906 15 23.925 15.6047 23.8406 16.2938C23.5453 18.6469 21.7594 20.4844 19.5 20.9062V21C19.5 21.8297 18.8297 22.5 18 22.5H6C5.17031 22.5 4.5 21.8297 4.5 21V20.9062C2.24062 20.4844 0.454687 18.6469 0.164062 16.2938Z"
                          fill="#F9AF18"
                        />
                      </svg>
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
                {/* Row 2 */}
                <div className="bg-[#485E4A] h-[116px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="flex w-[45px] h-[45px] rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="24"
                        viewBox="0 0 30 24"
                        fill="none"
                        className="m-auto"
                      >
                        <g clipPath="url(#clip0_193_334)">
                          <path
                            d="M6.75 0C7.74456 0 8.69839 0.395088 9.40165 1.09835C10.1049 1.80161 10.5 2.75544 10.5 3.75C10.5 4.74456 10.1049 5.69839 9.40165 6.40165C8.69839 7.10491 7.74456 7.5 6.75 7.5C5.75544 7.5 4.80161 7.10491 4.09835 6.40165C3.39509 5.69839 3 4.74456 3 3.75C3 2.75544 3.39509 1.80161 4.09835 1.09835C4.80161 0.395088 5.75544 0 6.75 0ZM24 0C24.9946 0 25.9484 0.395088 26.6516 1.09835C27.3549 1.80161 27.75 2.75544 27.75 3.75C27.75 4.74456 27.3549 5.69839 26.6516 6.40165C25.9484 7.10491 24.9946 7.5 24 7.5C23.0054 7.5 22.0516 7.10491 21.3484 6.40165C20.6451 5.69839 20.25 4.74456 20.25 3.75C20.25 2.75544 20.6451 1.80161 21.3484 1.09835C22.0516 0.395088 23.0054 0 24 0ZM0 14.0016C0 11.2406 2.24062 9 5.00156 9H7.00312C7.74844 9 8.45625 9.16406 9.09375 9.45469C9.03281 9.79219 9.00469 10.1438 9.00469 10.5C9.00469 12.2906 9.79219 13.8984 11.0344 15C11.025 15 11.0156 15 11.0016 15H0.998437C0.45 15 0 14.55 0 14.0016ZM18.9984 15C18.9891 15 18.9797 15 18.9656 15C20.2125 13.8984 20.9953 12.2906 20.9953 10.5C20.9953 10.1438 20.9625 9.79688 20.9062 9.45469C21.5438 9.15937 22.2516 9 22.9969 9H24.9984C27.7594 9 30 11.2406 30 14.0016C30 14.5547 29.55 15 29.0016 15H18.9984ZM10.5 10.5C10.5 9.30653 10.9741 8.16193 11.818 7.31802C12.6619 6.47411 13.8065 6 15 6C16.1935 6 17.3381 6.47411 18.182 7.31802C19.0259 8.16193 19.5 9.30653 19.5 10.5C19.5 11.6935 19.0259 12.8381 18.182 13.682C17.3381 14.5259 16.1935 15 15 15C13.8065 15 12.6619 14.5259 11.818 13.682C10.9741 12.8381 10.5 11.6935 10.5 10.5ZM6 22.7484C6 19.2984 8.79844 16.5 12.2484 16.5H17.7516C21.2016 16.5 24 19.2984 24 22.7484C24 23.4375 23.4422 24 22.7484 24H7.25156C6.5625 24 6 23.4422 6 22.7484Z"
                            fill="#F9AF18"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_193_334">
                            <path d="M0 0H30V24H0V0Z" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
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
                {/* Row 3 */}
                <div className="bg-[#485E4A] h-[116px] rounded-[8px] flex flex-row">
                  <div className="w-1/6 flex justify-center items-center">
                    <div className="flex w-[45px] h-[45px] rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="24"
                        viewBox="0 0 27 24"
                        fill="none"
                        className="m-auto"
                      >
                        <g clipPath="url(#clip0_193_342)">
                          <path
                            d="M6.9375 3.59062C6.9375 1.60781 8.54531 0 10.5281 0C11.4797 0 12.3938 0.379687 13.0641 1.05L13.5 1.48594L13.9359 1.05C14.6063 0.379687 15.5203 0 16.4719 0C18.4547 0 20.0625 1.60781 20.0625 3.59062C20.0625 4.54219 19.6828 5.45625 19.0125 6.12656L14.1609 10.9734C13.7953 11.3391 13.2 11.3391 12.8344 10.9734L7.9875 6.12656C7.31719 5.45625 6.9375 4.54219 6.9375 3.59062ZM26.6344 15.7641C27.2484 16.5984 27.0703 17.7703 26.2359 18.3844L20.3016 22.7578C19.2047 23.5641 17.8828 24 16.5188 24H9H1.5C0.670313 24 0 23.3297 0 22.5V19.5C0 18.6703 0.670313 18 1.5 18H3.225L5.32969 16.3125C6.39375 15.4594 7.71563 15 9.07969 15H12.75H13.5H16.5C17.3297 15 18 15.6703 18 16.5C18 17.3297 17.3297 18 16.5 18H13.5H12.75C12.3375 18 12 18.3375 12 18.75C12 19.1625 12.3375 19.5 12.75 19.5H18.4031L24.0141 15.3656C24.8484 14.7516 26.0203 14.9297 26.6344 15.7641ZM9.075 18H9.03281C9.04688 18 9.06094 18 9.075 18Z"
                            fill="#F9AF18"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_193_342">
                            <path d="M0 0H27V24H0V0Z" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
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
              {/* End of list information */}
              {/* Quote */}
              <div className="w-full h-[208px] flex flex-col bg-[#F5B041] mt-6 p-6 rounded-[12px]">
                <p className="text-sm text-[#344C36]">
                  "Setiap donasi makanan yang Anda berikan tidak hanya <br />
                  menyelamatkan makanan dari pembuangan, tetapi juga <br />
                  memberikan harapan dan bantuan nyata bagi mereka <br />
                  yang membutuhkan."
                </p>
                <div className="flex flex-row mt-auto">
                  <div className="w-[15%] flex justify-center items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-400">.</div>
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
        </div>
      </div>
    </div>
  );
}