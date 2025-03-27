import { NextRequest } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { i18n } from "@/locales/config";

// 创建国际化中间件实例
const I18nMiddleware = createI18nMiddleware(i18n);

// 导出中间件函数，用于处理所有匹配的请求
export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

// 配置中间件的匹配规则
export const config = {
  // 匹配所有路径，但排除以下路径：
  // - api: API 路由
  // - static: 静态文件
  // - .*\\..*: 所有带扩展名的文件
  // - _next: Next.js 内部文件
  // - favicon.ico: 网站图标
  // - robots.txt: 搜索引擎爬虫配置文件
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
