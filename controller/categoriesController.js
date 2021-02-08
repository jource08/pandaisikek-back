const pool = require("../db");
const Joi = require("joi");

const getCategories = async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM categories");
    res.json(allCategories.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getACategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await pool.query(
      "SELECT * FROM categories where id = $1",
      [id]
    );
    res.json(category.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, parent_id, inserted_at, updated_at } = req.body;

    // validation with Joiiiiiiii
    const schema = Joi.object({
      name: Joi.string().min(4).required(),
      parent_id: Joi.any().optional(),
      inserted_at: Joi.date().iso().greater("now").required(),
      updated_at: Joi.date().iso().greater("now").required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(400).send(validation.error.message);
      return;
    }

    // check existing category name
    const category = await pool.query(
      "SELECT * FROM categories where name = $1",
      [name]
    );
    if (category.rows.length > 0) {
      res.status(400).send([name] + " is already exist.");
      return;
    }

    const newCategory = await pool.query(
      "INSERT INTO categories (name, parent_id, inserted_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, parent_id, inserted_at, updated_at]
    );
    res.json(newCategory.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const updateCateory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent_id, updated_at } = req.body;

    // validation with Joiiiiiiii
    const schema = Joi.object({
      name: Joi.string().min(4).required(),
      parent_id: Joi.any().optional(),
      updated_at: Joi.date().iso().greater("now").required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      res.status(400).send(validation.error.message);
      return;
    }

    const updateACateory = pool.query(
      "UPDATE categories SET name = $1, parent_id = $2, updated_at = $3 WHERE id = $4",
      [name, parent_id, updated_at, id]
    );
    res.json("Category updated!");
  } catch (err) {
    console.log(err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteACategory = await pool.query(
      "DELETE FROM categories WHERE id = $1",
      [id]
    );
    res.json("Cateory deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * !For API teting only
 */
const tetCategory = {
  name: "test",
  parent_id: null,
  inserted_at: "2021-02-08T17:58:45.070Z",
  updated_at: "2021-02-08T17:58:45.070Z",
};
/**
 * !Will not be used anywhere
 */

module.exports = {
  getCategories,
  getACategory,
  createCategory,
  updateCateory,
  deleteCategory,
};
