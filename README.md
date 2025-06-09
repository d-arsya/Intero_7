# 🌾 BBJ Donate – Redistribusi Pangan Berbasis Interoperabilitas API

**BBJ Donate** adalah platform digital untuk redistribusi makanan berlebih dari hotel ke yayasan secara efisien dan terkoordinasi. Sistem ini mengintegrasikan *Berbagi Bites Jogja (BBJ)* dengan *BBJ Donate* melalui RESTful API dan visualisasi lokasi dengan LeafletJS.

> 🔗 Live App  
> - **Frontend (Next.js)**: [https://intero.disyfa.cloud](https://intero.disyfa.cloud)  
> - **Backend (Laravel API)**: [https://intero-be.disyfa.cloud](https://intero-be.disyfa.cloud)

---

## 🧠 Tujuan

Menghubungkan hotel sebagai donatur dan yayasan sebagai penerima manfaat secara **terstruktur**, **otomatis**, dan **transparan** melalui:
- RESTful API interoperabilitas
- Peta interaktif LeafletJS
- WhatsApp Gateway via Fonnte

---

## 🏗️ Teknologi yang Digunakan

| Layer         | Teknologi                     |
|---------------|-------------------------------|
| Frontend      | [Next.js](https://nextjs.org) |
| Backend       | [Laravel](https://laravel.com) RESTful API |
| Database      | MySQL                         |
| Maps          | [LeafletJS](https://leafletjs.com/) + Google Maps API |
| Messaging     | [Fonnte](https://fonnte.com/) (WhatsApp Gateway) |
| Autentikasi   | JWT Token + API Key (via Header) |

---

## ✨ Fitur Utama

- ✅ Registrasi & Login pengguna
- 🛒 Input & tracking donasi dari hotel ke yayasan
- 📡 Integrasi data yayasan dari BBJ
- 🗺️ Visualisasi lokasi via LeafletJS
- 💬 Notifikasi otomatis ke WhatsApp via Fonnte
- 📊 Riwayat dan status donasi

---

## ⚙️ Cara Menjalankan (Dev Setup)

### 1. Clone Repository

```bash
git clone https://github.com/d-arsya/Intero_7 bbj-donate
cd bbj-donate
cd frontend
npm install
npm run dev
```
Akses di http://localhost:3000
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
Akses di http://localhost:8000

## Endpoint
| Method | Endpoint    | Deskripsi                    |
| ------ | ----------- | ---------------------------- |
| POST   | `/register` | Registrasi user baru         |
| POST   | `/login`    | Login dan dapatkan token JWT |
| GET    | `/donation`      | Ambil histori donasi user yang login |
| POST   | `/donation`      | Buat donasi baru                     |
| GET    | `/donation/{id}` | Ambil detail donasi berdasarkan ID   |
| PUT    | `/donation/{id}` | Perbarui status donasi               |
| GET    | `/foundations` | Ambil daftar yayasan dari sistem BBJ |
| GET    | `/hotels` | Ambil semua data hotel terdaftar |

# 👨‍💻 Tim Pengembang
- Khairunnisa
- Kamaluddin Arsyad Fadllillah
- Anugrah Aidil Fitri
- Rahmat Nur Panghegar
- Emilio Muhammad Hamsyah Junior
- Nadzira Azhani Farahiya
- Yogi Pradana Isdiyanto