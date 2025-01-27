import { getTodosAction } from "@/actions/todo.actions";
import AddTodoDialog from "@/components/Dialog";
import TodoTable from "@/components/TodoTable";

export default async function Home() {
  const todos = await getTodosAction();

  return (
    <section className="container mt-16">
      <div className="flex justify-end w-full">
        <AddTodoDialog />
      </div>
      <TodoTable todos={todos} />
    </section>
  );
}
