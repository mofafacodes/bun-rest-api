import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Bun Dev REST-APIs")
.get('/post/:id', ({params: {id}}) => {return {id: id, title: "Hello Bun Dev REST-APIs"}})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
