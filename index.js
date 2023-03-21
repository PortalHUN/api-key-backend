require("dotenv").config();
const express = require("express");
const db = require("./src/utils/db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static("public"));

const admin = require("./src/middleware/AdminMiddleware");

//API CHECK
app.use(require("./src/middleware/APIKey"));

//USER ROUTES

app.get("/", async (req, res) => {
  res.status(200).json({
    message: `Welcome to the Questions API ${req.api.AppName}!${
      req.api.Admin ? " Welcome Admin!" : ""
    }`,
  });
});

//ADMIN ROUTES
app.use(admin, require("./src/routes/APIKeyRoutes"));

app.listen(port, () => {
  console.log(`[APP] Application is running on ${port}...`);
});
