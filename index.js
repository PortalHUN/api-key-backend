require("dotenv").config();
const express = require("express");
const db = require("./src/utils/db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*const jwt = require("jsonwebtoken");
app.get("/asd", async (req, res) => {
  await db.query(`SELECT * FROM api_keys WHERE ID = 1;`, async (err, result) => {
    const token = await jwt.sign({ AppName: result[0].AppName, ApiKey: result[0].ApiKey }, process.env.APIKEYSECRET);
    return res.json({ token: token });
  });
});*/

const admin = require("./src/middleware/AdminMiddleware");
const permission = require("./src/middleware/RequirePermission");

//API CHECK
app.use(require("./src/middleware/APIKey"));

//STATIC FILES
app.use("/static", permission(["static"]), express.static("public"));

//USER ROUTES
app.get("/", async (req, res) => {
  res.status(200).json({
    message: `Welcome${req.api.Admin ? " Admin" : ""} ${req.api.AppName} to the Questions API!`,
    user: req.api,
  });
});
app.use('/person', require('./src/routes/PersonRoutes'));

//ADMIN ROUTES
app.use("/admin/api", admin, require("./src/routes/APIKeyRoutes"));
app.use("/admin/permissions", admin, require("./src/routes/PermissionRoutes"));

app.listen(port, () => {
  console.log(`[APP] Application is running on ${port}...`);
});
