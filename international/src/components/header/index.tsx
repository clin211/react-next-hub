"use client";

import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { localeKeys } from "@/locales/config";

export default function Header() {
  // 获取当前语言
  const currentLocale = useCurrentLocale();
  // 获取切换语言的函数
  const changeLocale = useChangeLocale();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <p className="text-gray-700 font-medium">
              当前语言: <span className="text-blue-600">{currentLocale.toUpperCase()}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {localeKeys.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changeLocale(item)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${currentLocale === item
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
