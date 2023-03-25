const router = require("express").Router();

router.post("/add", require("../controllers/Permission/AddPermission"));

router.post("/remove", require("../controllers/Permission/RemovePermission"));

module.exports = router;
