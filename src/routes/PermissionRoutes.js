const router = require("express").Router();

router.post("/add", require("../controllers/Permission/AddPermission"));

module.exports = router;
