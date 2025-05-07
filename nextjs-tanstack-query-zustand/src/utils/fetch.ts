import axios from 'axios';

// 创建 axios 实例
export const apiClient = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 产品相关 API
export const productsApi = {
    // 获取所有产品
    getAll: async () => {
        const { data } = await apiClient.get('/products');
        return data;
    },

    // 获取单个产品
    getById: async (id: number) => {
        const { data } = await apiClient.get(`/products/${id}`);
        return data;
    },

    // 获取产品分类
    getCategories: async () => {
        const { data } = await apiClient.get('/products/categories');
        return data;
    },

    // 获取特定分类的产品
    getByCategory: async (category: string) => {
        const { data } = await apiClient.get(`/products/category/${category}`);
        return data;
    },

    // 添加新产品
    create: async (product: any) => {
        const { data } = await apiClient.post('/products', product);
        return data;
    },

    // 更新产品
    update: async (id: number, product: any) => {
        const { data } = await apiClient.put(`/products/${id}`, product);
        return data;
    },

    // 删除产品
    delete: async (id: number) => {
        const { data } = await apiClient.delete(`/products/${id}`);
        return data;
    },
};

// 购物车相关 API
export const cartApi = {
    // 获取用户购物车
    getUserCart: async (userId: number) => {
        const { data } = await apiClient.get(`/carts/user/${userId}`);
        return data;
    },

    // 添加商品到购物车
    addToCart: async (cartItem: any) => {
        const { data } = await apiClient.post('/carts', cartItem);
        return data;
    },

    // 更新购物车
    updateCart: async (id: number, cart: any) => {
        const { data } = await apiClient.put(`/carts/${id}`, cart);
        return data;
    },
};

// 用户相关 API
export const userApi = {
    // 获取所有用户
    getAll: async () => {
        const { data } = await apiClient.get('/users');
        return data;
    },

    // 获取单个用户
    getById: async (id: number) => {
        const { data } = await apiClient.get(`/users/${id}`);
        return data;
    },

    // 用户登录
    login: async (credentials: { username: string; password: string }) => {
        const { data } = await apiClient.post('/auth/login', credentials);
        return data;
    },
};

// 导出所有 API
export const api = {
    products: productsApi,
    cart: cartApi,
    user: userApi,
};