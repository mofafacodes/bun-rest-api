import { Elysia, t} from "elysia";
import {plugin} from "./plugin";
import { signinDTO, responseDTO } from "./models";

//defining application
const app = new Elysia()
.get("/", () => "Hello Bun Dev REST-APIs")
//registering plugin in application instance using the use method
//you can use plugins to break your code into multiple components
.use(plugin)
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
  //   
  // }),
  // {
  //   headers: {'Content-Type': 'application/json'}}
  // )
  console.log(store)
  console.log(getDate())
  //accessing state in plugin
  console.log(store['plugin-version'])
  return {
    "tracks":[
    'dancing feet',
    'walking toes',
    "running knees",
    "running knees"
    ]
  }
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


//grouping multiple Routes
//user routes
app.group('/user', app => app
.post('/sign-in', ({body}) => body,{
  //adding validation
body: signinDTO,
response: responseDTO
})
.post('/sign-up', () => "sign up")
.post('/profile', () => "craete profile")
.post('/signup', () => "sign up")
.get('/:id', ({params: id}) => {
  return id},
  {
    //adding validation for params
    params: t.Object({
      id: t.Numeric()
    })

  }

)
);

//nested routes and versioning
//product routes
app.group('/v1', app => app
.get('/', () => "Version 1")
.group('/products', app => app
.post('/', () => "create products")
.get('/:id', () => "get products by id")
));

app.listen(3000);