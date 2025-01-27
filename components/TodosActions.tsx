"use client";

import { Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { deleteTodoAction } from "@/actions/todo.actions";
import { useState } from "react";

const TodosActions = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (id: string) => {
    setLoading(true);
    await deleteTodoAction({ id });
    setLoading(false);
  };
  return (
    <>
      <Button size={"icon"} variant={"outline"}>
        <Pen size={16} />
      </Button>
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={() => {
          onDelete(id);
        }}>
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default TodosActions;
