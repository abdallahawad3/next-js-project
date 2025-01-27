import { z } from "zod";

export const ADD_TODO_SCHEMA = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 2 characters.",
  }),

  body: z
    .string()
    .max(50, {
      message: "Body must be at most 50 characters.",
    })
    .optional(),
  completed: z.boolean().optional().default(false),
});
