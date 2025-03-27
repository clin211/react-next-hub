import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const isAfter9AM = new Date().getHours() >= 9;

    if (!isAfter9AM) {
        return NextResponse.redirect(new URL('/dashboard', request.url)) // 如果不是上午9点后，则重定向到 /dashboard
    } else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: '/work_tools/:path*',
}


