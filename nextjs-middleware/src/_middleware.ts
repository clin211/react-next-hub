import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

// 定义中间件函数的类型
type Middleware = (request: NextApiRequest) => Promise<NextResponse>;
type MiddlewareWrapper = (middleware: Middleware) => Middleware;

// 链式调用中间件的函数
function chain(functions: MiddlewareWrapper[], index: number = 0): Middleware {
    return async (request: NextApiRequest): Promise<NextResponse> => {
        const current = functions[index];
        if (index < functions.length) {
            const next = chain(functions, index + 1);
            return current(next)(request);
        }
        return NextResponse.next();
    };
}

// 定义中间件1的包装函数
function withMiddleware1(middleware: Middleware) {
    console.log('middleware 1');
    return async (request: NextApiRequest): Promise<NextResponse> => middleware(request);
}

// 定义中间件2的包装函数
function withMiddleware2(middleware: Middleware) {
    console.log('middleware 2');
    return async (request: NextApiRequest): Promise<NextResponse> => middleware(request);
}

// 导出链式中间件
export default chain([withMiddleware1, withMiddleware2]);

// 导出配置
export const config = {
    matcher: '/api/:path*',
};