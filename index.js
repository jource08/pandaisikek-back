const express = require("express");
const app = express();
const todoRoute = require("./routes/todoRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json()); // req.body

// routes
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerDocument));
app.use(todoRoute);
app.use(categoriesRoute);

app.listen(3000, () => {
  console.log("dick");
});
