import { headers } from 'next/headers';

export async function GET(request: Request) {
    const headersList = headers();
    const referer = headersList.get('referer');

    return new Response('Hello, Next.js!', {
        status: 200,
        headers: {
            referer,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
