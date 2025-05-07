import { create } from 'zustand';

interface SettingsState {
    apiUrl: string;
    timeout: number;
    debug: boolean;

    updateSettings: (settings: Partial<Omit<SettingsState, 'updateSettings'>>) => void;
}

// 环境特定初始化逻辑
const getInitialSettings = () => {
    const isProd = process.env.NODE_ENV === 'production';

    return {
        apiUrl: isProd
            ? 'https://api.example.com/v1'
            : 'http://localhost:3001/api',
        timeout: isProd ? 10000 : 3000,
        debug: !isProd,
    };
};

export const useSettingsStore = create<SettingsState>((set) => {
    const initialSettings = getInitialSettings();

    return {
        ...initialSettings,
        updateSettings: (newSettings) => set((state) => ({
            ...state,
            ...newSettings,
        })),
    };
});