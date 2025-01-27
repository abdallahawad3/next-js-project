"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodosAction = async ({ id }: { id: string | null }) => {
  const todos = await prisma.todo.findMany({
    where: {
      user_id: id as string,
    },
    take: 10,
  });
  return todos;
};
export const createTodoAction = async (data: {
  title: string;
  body?: string;
  completed?: boolean;
  userId: string;
}) => {
  await prisma.todo.create({
    data: {
      title: data.title,
      body: data.body,
      completed: data.completed,
      user_id: data.userId,
    },
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
