import { create } from 'zustand';

// 用户类型定义
interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
}

// 用户存储状态类型
interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

interface UserAction {
    // 操作方法
    setUser: (user: User | null) => void;
    updatePreferences: (preferences: Partial<User['preferences']>) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
}

// 创建用户存储
const useUserStore = create<UserState & UserAction>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user, error: null }),
    updatePreferences: (preferences) =>
        set((state) => ({
            user: state.user
                ? {
                    ...state.user,
                    preferences: { ...state.user.preferences, ...preferences }
                }
                : null
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    logout: () => set({ user: null }),
}));

export default useUserStore;