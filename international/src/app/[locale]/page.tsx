import Image from "next/image";
import { getCurrentLocale, getI18n, getScopedI18n } from "@/locales/server";

export default async function Home() {
  // 获取全局翻译函数
  const t = await getI18n();
  // 获取指定命名空间（hello）的翻译函数
  const scopedT = await getScopedI18n("hello");
  // 获取当前语言
  const currentLocale = await getCurrentLocale();

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div>
        {/* 显示当前语言 */}
        <p>当前语言为：{currentLocale}</p>
        {/* 使用全局翻译函数 */}
        <p>{t("hello")}</p>

        {/* 两种等效的翻译方式示例 */}
        {/* 1. 使用全局翻译函数，通过点号访问嵌套翻译 */}
        <p>{t("hello.world")}</p>
        {/* 2. 使用作用域翻译函数，直接访问指定命名空间的翻译 */}
        <p>{scopedT("world")}</p>

        {/* 带参数的翻译示例 */}
        {/* 使用作用域翻译函数，传入 name 参数 */}
        <p>{`scopedT("welcome", { name: '长林啊' }): ${scopedT("welcome", { name: "长林啊" })}`}</p>

        {/* 使用全局翻译函数，传入 name 参数 */}
        <p>{t("welcome", { name: "长林啊" })}</p>
        {/* 使用全局翻译函数，传入 React 元素作为参数 */}
        <p>{t("welcome", { name: <strong>长林啊</strong> })}</p>
      </div>
    </main>
  );
}
