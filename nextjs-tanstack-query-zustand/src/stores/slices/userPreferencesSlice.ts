import { StateCreator } from 'zustand';
import { ThemeSlice } from './themeSlice';

// 用户偏好切片（依赖主题切片）
export interface UserPreferencesSlice {
    fontSize: 'small' | 'medium' | 'large';
    useSystemTheme: boolean;
    toggleSystemTheme: () => void;
    setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

// 使用 StateCreator 的函数式组合能力
export const createUserPreferencesSlice: StateCreator<
    UserPreferencesSlice & ThemeSlice,
    [],
    [],
    UserPreferencesSlice
> = (set, get) => ({
    fontSize: 'medium',
    useSystemTheme: false,

    toggleSystemTheme: () => {
        const useSystemTheme = !get().useSystemTheme;
        set({ useSystemTheme });

        // 如果启用系统主题，则设置主题（通过访问 ThemeSlice）
        if (useSystemTheme) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            get().setTheme(systemTheme);
        }
    },

    setFontSize: (fontSize) => set({ fontSize }),
});