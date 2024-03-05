import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { TodoRouter } from "../../../server/utils/trpc/routers/todo";

const client = createTRPCProxyClient<TodoRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

export const todoClient = {
  createTodo: async (text: string) => {
    return client.createTodo.mutate({ text });
  },
  readTodo: async () => {
    return client.readTodo.query();
  },
  updateTodo: async (id: string, isCompleted: boolean) => {
    return client.updateTodo.mutate({ id, isCompleted });
  },
  deleteTodo: async (id: string) => {
    return client.deleteTodo.mutate({ id });
  },
};
