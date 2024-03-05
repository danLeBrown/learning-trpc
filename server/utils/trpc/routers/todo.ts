import { t } from "../trpc";
import z from "zod";
import crypto from 'crypto';

export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
}

const TODOS: Todo[] = [];

export const todoRouter = t.router({
  createTodo: t.procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(req => {
      const todo: Todo = {
        id: crypto.randomBytes(16).toString('hex'),
        text:req.input.text,
        isCompleted: false
      }

      TODOS.push(todo);
      
      return todo;
    }),

  readTodo: t.procedure.query(() => {
    console.log("read todo");
    return "read todo";
  }),

  deleteTodo: t.procedure.input(z.string()).mutation(() => {}),

  updateTodo: t.procedure
    .input(
      z.object({
        id: z.string(),
        text: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(() => {}),
});

export type TodoRouter = typeof todoRouter;
