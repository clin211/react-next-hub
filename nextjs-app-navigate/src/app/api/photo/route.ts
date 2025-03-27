import { PhotoRequest, PhotoResponse } from '@/app/types/photo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get('page')
    const pageSize = req.nextUrl.searchParams.get('pageSize')
    // 读取环境变量
    const API_KEY = process.env.PIXABAY_KEY
    if (!API_KEY) return NextResponse.json({ error: 'API_KEY is not defined' })

    const result = await fetch(`https://pixabay.com/api/?key=${API_KEY}&per_page=${pageSize}&page=${page}&lang=zh`)

    if (result.status !== 200) return NextResponse.error();
    const data = await result.json()
    return NextResponse.json(data)
}