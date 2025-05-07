import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from '@/stores/slices/authSlice';
import { ThemeSlice, createThemeSlice } from '@/stores/slices/themeSlice';

// 组合多个切片的类型
interface AppState extends AuthSlice, ThemeSlice { }

// 创建组合存储
const useAppStore = create<AppState>((...a) => ({
    ...createAuthSlice(...a),
    ...createThemeSlice(...a),
}));

export default useAppStore;