"use client";

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { deleteTodoAction } from "@/actions/todo.actions";
import { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import type { ITodo } from "@/interface";

const TodosActions = ({ todo }: { todo: ITodo }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (id: string) => {
    setLoading(true);
    await deleteTodoAction({ id });
    setLoading(false);
  };
  return (
    <>
      <EditTodoForm todo={todo} />
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={() => {
          onDelete(todo.id);
        }}>
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default TodosActions;
