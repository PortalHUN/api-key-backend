const db = require("../../utils/db");
const jwt = require("jsonwebtoken");

const ShowAPIKey = async (req, res) => {
  const { ID, AppName } = req.body;
  if (!(ID && AppName && Number.isInteger(ID))) return res.status(400).json({ err: "Invalid data" });
  await db.query(
    `SELECT * FROM api_keys WHERE ID = ${db.escape(ID)} AND AppName = ${db.escape(AppName)};`,
    async (err, result) => {
      if (err) return res.status(500).json({ err: "Database error: " + err.sqlMessage });
      else if (result.length == 0) return res.status(400).json({ err: "Invalid data" });

      //Success
      const token = await jwt.sign(
        {
          AppName: result[0].AppName,
          ApiKey: result[0].ApiKey,
        },
        process.env.APIKEYSECRET
      );
      return res.status(200).json({ token });
    }
  );
};

module.exports = ShowAPIKey;
