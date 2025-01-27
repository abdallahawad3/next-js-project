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
import { Textarea } from "./ui/textarea";
import { ADD_TODO_SCHEMA } from "@/validation";
import { Checkbox } from "./ui/checkbox";
import { createTodoAction } from "@/actions/todo.actions";
import { Plus } from "lucide-react";
import { useState } from "react";
import Spinner from "./Spinner";

const AddTodoDialog = () => {
  // Use Form
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof ADD_TODO_SCHEMA>>({
    resolver: zodResolver(ADD_TODO_SCHEMA),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ADD_TODO_SCHEMA>) {
    setLoading(true);
    await createTodoAction(data);
    form.reset({
      title: "",
      completed: false,
      body: "",
    });
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} />
          Add New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
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
              <span className="flex items-center gap-1">{loading && <Spinner />} Add Nwe Todo</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
