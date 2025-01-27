"use server";
import { getTodosAction } from "@/actions/todo.actions";
import AddTodoDialog from "@/components/Dialog";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  let todos: {
    id: string;
    title: string;
    body: string | null;
    completed: boolean | null;
    user_id: string;
    createdAt: Date | null;
  }[] = [];

  try {
    todos = await getTodosAction({ id: userId });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
  return (
    <section className="container mt-16">
      <div className="flex justify-end w-full mb-2">
        <AddTodoDialog userId={userId as string} />
      </div>
      <TodoTable todos={todos.reverse()} />
    </section>
  );
}
