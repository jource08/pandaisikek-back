const pool = require("../db");
const Joi = require("joi");

const getTodo = async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getATodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo where id = $1", [id]);
    res.json(todo.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const schema = Joi.object({
      description: Joi.string().min(16).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      res.status(400).send(result.error.message);
      return;
    }
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const schema = Joi.object({
      description: Joi.string().min(16).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      res.status(400).send(result.error.message);
      return;
    }
    const updateTodo = pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id]
    );
    res.json("Updated");
  } catch (err) {
    console.log(err.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json("Deleted");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getTodo, getATodo, createTodo, updateTodo, deleteTodo };
