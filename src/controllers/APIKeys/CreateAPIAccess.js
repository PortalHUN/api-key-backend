const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const db = require("../../utils/db");

const createAPIAccess = async (req, res) => {
  //POST Request
  const { AppName } = req.body;
  if (!AppName)
    return res.status(400).json({ err: "You must supply AppName!" });
  const ApiKey = v4();
  await db.query(
    `INSERT INTO api_keys (AppName, ApiKey) VALUES (${db.escape(
      AppName
    )}, ${db.escape(ApiKey)});`,
    async (error, result) => {
      try {
        if (error) throw { msg: error.sqlMessage, status: 500 };
        const token = await jwt.sign(
          { AppName, ApiKey },
          process.env.APIKEYSECRET
        );
        res.status(200).json({ message: "Creation completed!", key: token });
      } catch (error) {
        res.status(error.status || 500).json({ err: error.msg || "?" });
      }
    }
  );
};

module.exports = createAPIAccess;
