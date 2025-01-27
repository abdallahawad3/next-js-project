"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodosAction = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      completed: "desc",
    },
  });
  return todos;
};
export const createTodoAction = async (data: {
  title: string;
  body?: string;
  completed?: boolean;
}) => {
  await prisma.todo.create({
    data,
  });

  revalidatePath("/");
};
export const updateTodoAction = async (data: {
  id: string;
  title: string;
  body?: string;
  completed?: boolean;
}) => {
  await prisma.todo.update({
    data: {
      title: data.title,
      body: data.body,
      completed: data.completed,
    },
    where: {
      id: data.id,
    },
  });
  revalidatePath("/");
};
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
};
