import { NextResponse } from "next/server";

export async function GET () {
    const dbConfig = {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        twitter: process.env.TWITTER_URL
    }

    console.log('db config:', dbConfig);
    return NextResponse.json({ status: 'ok' })
}