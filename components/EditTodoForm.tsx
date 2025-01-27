"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { ADD_TODO_SCHEMA } from "@/validation";
import { Pen } from "lucide-react";
import { Textarea } from "./ui/textarea";
import Spinner from "./Spinner";
import { Checkbox } from "./ui/checkbox";
import type { ITodo } from "@/interface";
import { updateTodoAction } from "@/actions/todo.actions";

const EditTodoForm = ({ todo }: { todo: ITodo }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ADD_TODO_SCHEMA>>({
    resolver: zodResolver(ADD_TODO_SCHEMA),
    defaultValues: {
      title: todo.title,
      body: todo.body as string,
      completed: todo.completed as boolean,
    },
  });

  async function onSubmit(data: z.infer<typeof ADD_TODO_SCHEMA>) {
    setLoading(true);

    await updateTodoAction({
      id: todo.id,
      title: data.title,
      body: data.body,
      completed: data.completed,
    });

    setLoading(false);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pen size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Checkbox
                        id="completed"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormLabel htmlFor="completed">Completed</FormLabel>
            </div>

            <Button
              className={`ml-auto block ${loading ? "cursor-not-allowed" : ""}`}
              type="submit"
              disabled={loading}>
              <span className="flex items-center gap-1">{loading && <Spinner />} Save</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoForm;
