import { StateCreator } from 'zustand';

// 认证状态切片
export interface AuthSlice {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    token: null,
    isAuthenticated: false,

    login: (token) => set({ token, isAuthenticated: true }),
    logout: () => set({ token: null, isAuthenticated: false }),
});