import { getTodosAction } from "@/actions/todo.actions";
import AddTodoDialog from "@/components/Dialog";

export default async function Home() {
  const todos = await getTodosAction();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AddTodoDialog />
      {todos.map((ele) => (
        <h1 key={ele.id}>{ele.title.slice(0, 5)}...</h1>
      ))}
    </div>
  );
}
