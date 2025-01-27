"use server";

import EditTodoForm from "./EditTodoForm";
import type { ITodo } from "@/interface";
import DeleteTodo from "./DeleteTodo";

const TodosActions = ({ todo }: { todo: ITodo }) => {
  return (
    <>
      <EditTodoForm todo={todo} />
      <DeleteTodo id={todo.id} />
    </>
  );
};

export default TodosActions;
