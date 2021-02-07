const express = require("express");
const app = express();
const todoRoute = require("./routes/todoRoute");

app.use(express.json()); // req.body

// routes
app.use(todoRoute);

app.listen(3000, () => {
  console.log("dick");
});
