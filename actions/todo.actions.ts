"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodosAction = async () => {
  const todos = await prisma.todo.findMany();
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
};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async () => {};
