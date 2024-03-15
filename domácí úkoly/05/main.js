// 4IT573 Základy Node.js
// 5. úkol

import express from 'express'

const port = 3000;
const app = express();

let ids = 0;
let todos = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.use( (req, res, next) => {
    console.log('Incomming request', req.method, req.url);
    next();
})

app.get('/', (req, res) => {
    res.render('index', {
        todos,
    })
  })

app.post("/add-todo", (req,res) => {
    const todo = {
        id: ids,
        title: req.body.title,
        done: false,
    }
    todos.push(todo);
    ids++;
    res.redirect("/");
})

app.get("/remove-todo/:id", (req,res) => {
    todos = todos.filter((todo) => {
        return todo.id !== Number(req.params.id)
    })

    res.redirect("/");
})

app.get("/toggle-todo/:id", (req,res) => {
    let todo = todos.find((todo) => {
        return todo.id === Number(req.params.id)
    })
    todo.done = !todo.done;
    res.redirect("/");
})

app.get("/todo/:id", (req, res) => {
    let todo = todos.find((todo) => {
        return todo.id === Number(req.params.id)
    })

    res.render("todo_detail", {
        todo
    })
})

app.post("/todo/:id/rename-todo", (req,res) => {
    let todo = todos.find((todo) => {
        return todo.id === Number(req.params.id)
    })
    todo.title = req.body.new_title;
    res.redirect("/");
})

app.use((req, res) => {
    res.status(404);
    res.send("404 - Page not found");
  })

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.send("500 - Server error")
  })

app.listen(port, () => {
    console.log("Server listening on http://localhost:" + port);
})