'use client';

import useUserStore from '@/stores/useUserStore';

export default function UserProfile() {
    // 使用选择器只获取需要的状态，避免不必要的重渲染
    const user = useUserStore((state) => state.user);
    const isLoading = useUserStore((state) => state.isLoading);
    const error = useUserStore((state) => state.error);
    const logout = useUserStore((state) => state.logout);
    const updatePreferences = useUserStore((state) => state.updatePreferences);

    if (isLoading) return <div>加载中...</div>;
    if (error) return <div className="text-red-500">错误: {error}</div>;
    if (!user) return <div>未登录</div>;

    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">用户资料</h2>
            <div className="mb-4">
                <p><strong>名称:</strong> {user.name}</p>
                <p><strong>邮箱:</strong> {user.email}</p>
                <p><strong>角色:</strong> {user.role}</p>
            </div>

            <h3 className="text-lg font-semibold mb-2">偏好设置</h3>
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <label className="mr-2">深色模式:</label>
                    <input
                        type="checkbox"
                        checked={user.preferences.theme === 'dark'}
                        onChange={(e) => updatePreferences({
                            theme: e.target.checked ? 'dark' : 'light'
                        })}
                    />
                </div>
                <div className="flex items-center">
                    <label className="mr-2">通知:</label>
                    <input
                        type="checkbox"
                        checked={user.preferences.notifications}
                        onChange={(e) => updatePreferences({
                            notifications: e.target.checked
                        })}
                    />
                </div>
            </div>

            <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                退出登录
            </button>
        </div>
    );
}