import {
    createMiddleware,
    type MiddlewareConfig,
    type MiddlewareFunctionProps,
} from '@rescale/nemo';
import { NextResponse } from 'next/server';

const middlewares = {
    '/about{/:path}?': [
        async ({ request }: MiddlewareFunctionProps) => {
            const response = NextResponse.next();
            console.log('middleware for /about', request.nextUrl.pathname);
            // 在 cookie 中设置 passed-cookie
            response.cookies.set('passed-cookie', 'cookie-value');
            // 在 header 中设置 x-custom-header
            response.headers.set('x-custom-header', 'header-value');
            return response;
        },
        async ({ request, response }: MiddlewareFunctionProps) => {
            console.log('Chained middleware for /about', request.nextUrl.pathname);
            // 在 cookie 中获取 passed-cookie
            console.log('Passed cookie value:', request.cookies.get('passed-cookie'));
            // 在 header 中获取 x-custom-header
            console.log(
                'Passed header value:',
                request.headers.get('x-custom-header'),
            );
            return response;
        },
    ],
    '/blog': [
        async ({ request }: MiddlewareFunctionProps) => {
            const response = NextResponse.next();
            console.log('Middleware for /blog', request.nextUrl.pathname);
            // 设置 cookies 和 header
            response.cookies.set('passed-cookie', 'cookie-value');
            response.headers.set('x-custom-header', 'header-value');
            return response;
        },
        async ({ request }: MiddlewareFunctionProps) => {
            const redirectUrl = new URL('/about', request.url);
            // 重定向到 /about
            return NextResponse.redirect(redirectUrl, {
                // 将原始请求头传递到重定向响应中
                headers: request.headers,
            });
        },
        async ({ request, response }: MiddlewareFunctionProps) => {
            console.log('Chained middleware for /blog', request.nextUrl.pathname);
            console.log('Passed cookie value:', request.cookies.get('passed-cookie'));
            console.log(
                'Passed header value:',
                request.headers.get('x-custom-header'),
            );
            return response;
        },
    ],
} satisfies MiddlewareConfig;

export const middleware = createMiddleware(middlewares);

export const config = {
    matcher: ['/blog', '/about/:path*'],
};


