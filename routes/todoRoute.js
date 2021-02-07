const express = require("express");
const app = express();
const todoController = require("../controller/todoController");

app.use(express.json()); // req.body

// get all todos
app.get("/todos", todoController.getTodo);

// get a todoo
app.get("/todos/:id", todoController.getATodo);

// create a todo
app.post("/todos", todoController.createTodo);

// update a todo
app.put("/todos/:id", todoController.updateTodo);

// delete a todo
app.delete("/todos/:id", todoController.deleteTodo);

module.exports = app;
