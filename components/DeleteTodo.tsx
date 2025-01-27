"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteTodoAction } from "@/actions/todo.actions";
import Spinner from "./Spinner";
import { Trash } from "lucide-react";

const DeleteTodo = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (id: string) => {
    setLoading(true);
    await deleteTodoAction({ id });
    setLoading(false);
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="bg-red-600 hover:bg-red-700 py-3 px-4 rounded-md">
          <Trash size={16} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your todo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 "
              onClick={() => {
                onDelete(id);
              }}>
              {loading ? <Spinner /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTodo;
