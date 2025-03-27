import { Suspense, use } from "react";

const todo = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return await res.json();
}

interface TodoItem {
  title: string;
  completed: boolean;
  id: number;
}

const Todo = ({ promise }: { promise: Promise<TodoItem> }) => {
  const todoData = use(promise);
  return (
    <div>
      <h2>Todo</h2>
      <p>{todoData.title}</p>
    </div>
  );
}
export default function App() {
  return (
    <div>
      <h2>App</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Todo promise={todo()} />
      </Suspense>
    </div>
  );
}
