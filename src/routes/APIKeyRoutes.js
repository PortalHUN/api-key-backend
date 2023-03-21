const router = require("express").Router();

router.post(
  "/admin/api/create",
  require("../controllers/APIKeys/CreateAPIAccess")
);

router.post("/admin/api/show", require("../controllers/APIKeys/ShowAPIAccess"));

router.post(
  "/admin/api/refresh",
  require("../controllers/APIKeys/RefreshAPIAccess")
);

module.exports = router;
