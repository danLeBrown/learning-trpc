import { t } from "../trpc";
import z from "zod";
import crypto from "crypto";

export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const TODOS: Todo[] = [];

const todoQueryProcedure = t.procedure.input(
  z.object({
    id: z.string(),
  })
);

export const todoRouter = t.router({
  createTodo: t.procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation((req) => {
      const todo: Todo = {
        id: crypto.randomBytes(16).toString("hex"),
        text: req.input.text,
        isCompleted: false,
      };

      TODOS.push(todo);

      return todo;
    }),

  readTodo: t.procedure.query(() => {
    return TODOS;
  }),

  deleteTodo: todoQueryProcedure.mutation((req) => {
    const todo = TODOS.find((todo) => todo.id === req.input.id);

    if (todo) {
      TODOS.splice(TODOS.indexOf(todo), 1);
    }

    return todo;
  }),

  updateTodo: todoQueryProcedure
    .input(
      z.object({
        isCompleted: z.boolean(),
      })
    )
    .mutation(req => {
      const todo = TODOS.find((todo) => todo.id === req.input.id);

      if (todo) {
        todo.isCompleted = req.input.isCompleted;
      }

      return todo;
    }),
});

export type TodoRouter = typeof todoRouter;
