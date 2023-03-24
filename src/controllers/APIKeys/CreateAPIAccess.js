const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const db = require("../../utils/db");

const createAPIAccess = async (req, res) => {
  //POST Request
  const { AppName } = req.body;
  if (!AppName) return res.status(400).json({ err: "Invalid data" });
  const ApiKey = v4();
  await db.query(
    `INSERT INTO api_keys (AppName, ApiKey) VALUES (${db.escape(AppName)}, ${db.escape(ApiKey)});`,
    async (error, result) => {
      if (error) return res.status(500).json({ err: "Database error: " + error.sqlMessage });
      const token = await jwt.sign({ AppName, ApiKey }, process.env.APIKEYSECRET);
      res.status(200).json({ message: "Creation completed!", key: token });
    }
  );
};

module.exports = createAPIAccess;
