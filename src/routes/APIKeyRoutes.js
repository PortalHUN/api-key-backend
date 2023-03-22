const router = require("express").Router();

router.post("/create", require("../controllers/APIKeys/CreateAPIAccess"));

router.post("/show", require("../controllers/APIKeys/ShowAPIAccess"));

router.post("/refresh", require("../controllers/APIKeys/RefreshAPIAccess"));

module.exports = router;
