const express = require("express");
const app = express();
const categoriesController = require("../controller/categoriesController");

app.use(express.json()); // req.body

// get all categories
app.get("/categories", categoriesController.getCategories);

// get a category
app.get("/categories/:id", categoriesController.getACategory);

// create a category
app.post("/categories", categoriesController.createCategory);

// update a category
app.put("/categories/:id", categoriesController.updateCateory);

// delete a category
app.delete("/categories/:id", categoriesController.deleteCategory);

module.exports = app;
