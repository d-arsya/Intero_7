// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const token = request.cookies?.get('token')?.value

//   const { pathname } = request.nextUrl

//   // Jika user belum login dan mencoba akses halaman private
//   if (!token && pathname.startsWith('/donasi')) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   // Jika user sudah login dan mencoba akses halaman login
//   if (token && pathname === '/') {
//     return NextResponse.redirect(new URL('/donasi', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/donasi', '/'], // halaman yang diawasi middleware
// }

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value
//   const { pathname } = request.nextUrl

//   // Daftar halaman yang memerlukan autentikasi
//   const protectedRoutes = ['/donasi']

//   // Daftar halaman yang hanya bisa diakses jika belum login
//   const authRoutes = ['/', '/register']

//   // Cek apakah user mencoba mengakses rute yang dilindungi tanpa token
//   if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   // Cek apakah user yang sudah login mencoba mengakses halaman login/register
//   if (authRoutes.includes(pathname) && token) {
//     return NextResponse.redirect(new URL('/donasi', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/donasi/:path*', // Melindungi semua sub-rute di bawah /donasi
//     '/',              // Halaman login
//     '/register'      // Halaman register
//   ]
// }




import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   // const token = request.cookies.get('token')
//   // const { pathname } = request.nextUrl

//   // console.log(token)

//   // // Logging untuk debugging
//   // console.log(`[Middleware] Path: ${pathname}, Token: ${token ? 'Present' : 'Not Present'}`)

//   // // Daftar rute yang memerlukan autentikasi
//   // const protectedRoutes = ['/donasi']

//   // // Daftar rute yang hanya bisa diakses jika belum login
//   // const authRoutes = ['/', '/register']

//   // // Cek apakah user mencoba mengakses rute yang dilindungi tanpa token
//   // if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
  //   //   console.log('[Middleware] No token found, redirecting to /')
  //   //   return NextResponse.redirect(new URL('/', request.url))
  //   // }
  
//   // // Cek apakah user yang sudah login mencoba mengakses halaman login/register
//   // if (authRoutes.includes(pathname) && token) {
  //   //   console.log('[Middleware] Token found, redirecting to /donasi')
  //   //   return NextResponse.redirect(new URL('/donasi', request.url))
//   // }

//   // Lanjutkan jika tidak ada redirect
//   console.log('[Middleware] Proceeding to next')
//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
  //     '/donasi/:path*', // Melindungi semua sub-rute di bawah /donasi
  //     '/',              // Halaman login
  //     '/register'       // Halaman register
//   ]
// }


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  if(!token) {
    return NextResponse.redirect(new URL('/',request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/donasi','/riwayat']
}