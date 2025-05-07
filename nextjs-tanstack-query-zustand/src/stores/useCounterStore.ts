import { create } from 'zustand';

// 1. 定义状态结构
interface CounterState {
    count: number;
}

// 2. 定义操作方法
interface CounterAction {
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    incrementBy: (value: number) => void;

}

// 3. 创建存储
const useCounterStore = create<CounterState & CounterAction>((set) => ({
    // 初始状态
    count: 0,

    // 状态操作方法
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
    incrementBy: (value) => set((state) => ({ count: state.count + value })),
}));

export default useCounterStore;