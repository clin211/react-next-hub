import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { ThemeSlice, createThemeSlice } from './slices/themeSlice';
import { UserPreferencesSlice, createUserPreferencesSlice } from "./slices/userPreferencesSlice"

// 组合多个切片的类型
interface AppState extends AuthSlice, ThemeSlice, UserPreferencesSlice { }

// 创建组合存储
const useAppStore = create<AppState>((...a) => ({
    ...createAuthSlice(...a),
    ...createThemeSlice(...a),
    ...createUserPreferencesSlice(...a),
}));

export default useAppStore;