import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { TodoRouter } from "../../server/utils/trpc/routers/todo";

const client = createTRPCProxyClient<TodoRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

export async function readTodo() {
  const result = await client.readTodo.query()
  console.log(result);
}

export async function createTodo(text: string) {
  return client.createTodo.mutate({ text })
}