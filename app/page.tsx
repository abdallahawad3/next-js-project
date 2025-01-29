"use server";
import { getTodosAction } from "@/actions/todo.actions";
import AddTodoDialog from "@/components/Dialog";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const start = Date.now();
  const { userId } = await auth();
  const todos = await getTodosAction({ id: userId });
  const end = Date.now();

  console.log("Time::::: ", (end - start) / 1000);
  return (
    <section className="container mt-16">
      <div className="flex justify-end w-full mb-2">
        <AddTodoDialog userId={userId as string} />
      </div>
      <TodoTable todos={todos.reverse()} />
    </section>
  );
}
