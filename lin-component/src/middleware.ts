import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const nextUrl = request.nextUrl
    if (nextUrl.pathname === '/dashboard') {
        if (request.cookies.get('authToken')) {
            return NextResponse.rewrite(new URL('/auth/dashboard', request.url))
        } else {
            return NextResponse.rewrite(new URL('/public/dashboard', request.url))
        }
    }
}

