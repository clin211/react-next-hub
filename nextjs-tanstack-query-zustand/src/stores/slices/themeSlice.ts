import { StateCreator } from 'zustand';

// 主题状态切片
export interface ThemeSlice {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
    theme: 'light',

    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
    })),

    setTheme: (theme) => set({ theme }),
});