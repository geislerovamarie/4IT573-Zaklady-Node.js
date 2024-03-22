// 4IT573 Základy Node.js
// 6. úkol

import express from 'express'
import knex from "knex"
import knexfile from './knexfile.js';


const prio = Object.freeze({
    NORMAL: 0,
    LOW: 1,
    HIGH: 2
});
const prio_text = ["Normální priorita", "Nízká priorita", "Vysoká priorita"];

const port = 3000;
const app = express();
const db = knex(knexfile);

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.use( (req, res, next) => {
    console.log('Incomming request', req.method, req.url);
    next();
})

app.get('/', async (req, res) => {
    const todos = await db().select("*").from('todos')
    res.render('index', {
        title: "Todos",
        todos,
        prio_text
    })
  })

app.post("/add-todo", async (req,res) => {
    const todo = {
        title: req.body.title,
        priority: 0,
        done: false,
    }

    await db("todos").insert(todo);
    res.redirect("/");
})

app.get("/remove-todo/:id", async (req,res) => {
    const todo = await db("todos").select("*").where("id", req.params.id).first()
    if (!todo) return next();
    await db("todos").delete().where("id", "=",todo.id)
    
    res.redirect("/");
})

app.get("/toggle-todo/:id", async (req,res, next) => {
    const todo = await db("todos").select("*").where("id", req.params.id).first()
    if (!todo) return next();
    await db("todos").update({done: !todo.done}).where("id", todo.id)
    res.redirect("back");
})

app.get("/todo/:id", async (req, res) => {
    const todo = await db("todos").select("*").where("id", req.params.id).first()

    if (!todo) return next();

    res.render("todo_detail", {
        todo,
        prio_text
    })
})

app.post("/update-todo/:id", async (req, res, next) => {
    const todo = await db("todos").select("*").where("id", req.params.id).first()
    if (!todo) return next();

    // update title
    if(req.body.title != ""){
        await db("todos").update({title: req.body.title}).where("id", todo.id)
    }

    // update priority
    await db("todos").update({priority: req.body.priority}).where("id", todo.id)
    res.redirect("back");
})

app.use((req, res) => {
    res.status(404);
    res.send("404 - Stránka nenalezena");
  })

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.send("500 - Server error")
  })
  
app.listen(port, () => {
    console.log("Server listening on http://localhost:" + port);
})