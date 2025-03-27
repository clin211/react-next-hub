import { createI18nMiddleware } from "next-international/middleware";

// 定义支持的语言配置
// 使用动态导入方式加载不同语言的翻译文件
export const locales = {
  en: () => import("./translations/en"),
  cn: () => import("./translations/cn"),
};

// 定义语言类型，从 locales 对象中提取键名作为类型
export type LocalesType = keyof typeof locales;
// 获取所有支持的语言代码数组
export const localeKeys: LocalesType[] = Object.keys(locales) as LocalesType[];

// 获取 createI18nMiddleware 函数的参数类型
type CreateI18nMiddlewareParams = Parameters<typeof createI18nMiddleware>;
// 定义中间件配置类型，继承自 createI18nMiddleware 的参数类型
// 但重写了 locales 字段的类型定义
type I18nMiddlewareConfig<T extends CreateI18nMiddlewareParams[0]["locales"]> =
  Omit<CreateI18nMiddlewareParams[0], "locales"> & { locales: T };

// 导出国际化配置对象
export const i18n: I18nMiddlewareConfig<(LocalesType | string)[]> = {
  // 设置默认语言为中文
  defaultLocale: "cn",
  // 设置支持的语言列表
  locales: localeKeys,
  // 设置 URL 映射策略为重写模式
  urlMappingStrategy: "rewrite",
};
