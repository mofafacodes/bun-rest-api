import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Bun Dev REST-APIs")
.state({
  id: '1',
  email: "mofafa@gmail.com",
})
.decorate('getDate', () => Date.now())
.get('/post/:id', ({params: {id}}) => {return {id: id, title: "Hello Bun Dev REST-APIs"}})
.post('/post', ({body, set, store}) =>{ 
  console.log(store)
  set.status = 201
  return {body}})
.get('/track/*', () => {return "Track Routes"})
.get('/tracks', ({store, getDate}) => {
  // return new Response(JSON.stringify({
  //   "tracks": [
  //     'dancing feet',
  //     'walking toes',
  //     "running knees"
  //   ]
  // }),
  // {
  //   headers: {'Content-Type': 'application/json'}}
  // )
  console.log(store)
  console.log(getDate())
  return {
    "tracks":[
    'dancing feet',
     'walking toes',
    "running knees",
    "running knees"
    ]
  }
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
