import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    tags: string[];
    subtasks: {
        id: string;
        title: string;
        completed: boolean;
    }[];
}

interface TaskState {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => void;
    removeTask: (id: string) => void;
    toggleTaskCompleted: (id: string) => void;
    addSubtask: (taskId: string, subtaskTitle: string) => void;
    toggleSubtaskCompleted: (taskId: string, subtaskId: string) => void;
    addTagToTask: (taskId: string, tag: string) => void;
}

export const useTaskStore = create<TaskState>()(
    immer((set) => ({
        tasks: [],

        addTask: (taskData) => set((state) => {
            state.tasks.push({
                ...taskData,
                id: Date.now().toString(),
            });
        }),

        removeTask: (id) => set((state) => {
            const index = state.tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                state.tasks.splice(index, 1);
            }
        }),

        toggleTaskCompleted: (id) => set((state) => {
            const task = state.tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
            }
        }),

        addSubtask: (taskId, subtaskTitle) => set((state) => {
            const task = state.tasks.find(t => t.id === taskId);
            if (task) {
                task.subtasks.push({
                    id: Date.now().toString(),
                    title: subtaskTitle,
                    completed: false,
                });
            }
        }),

        toggleSubtaskCompleted: (taskId, subtaskId) => set((state) => {
            const task = state.tasks.find(t => t.id === taskId);
            if (task) {
                const subtask = task.subtasks.find(st => st.id === subtaskId);
                if (subtask) {
                    subtask.completed = !subtask.completed;
                }
            }
        }),

        addTagToTask: (taskId, tag) => set((state) => {
            const task = state.tasks.find(t => t.id === taskId);
            if (task && !task.tags.includes(tag)) {
                task.tags.push(tag);
            }
        }),
    }))
);