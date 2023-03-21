const db = require("../../utils/db");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const RefreshAPIAccess = async (req, res) => {
  const { ID, AppName } = req.body;
  if (!(ID && AppName && Number.isInteger(ID)))
    return res.status(400).json({ err: "Invalid data" });
  req.failed = false;

  const newUUID = v4();
  await db.query(
    `UPDATE api_keys SET ApiKey = ${db.escape(newUUID)} WHERE ID = ${db.escape(
      ID
    )} AND AppName = ${db.escape(AppName)};`,
    (err, result) => {
      if (err) {
        req.failed = true;
        return res.status(500).json({ err: err.sqlMessage });
      } else if (result.affectedRows == 0) {
        req.failed = true;
        return res.status(400).json({ err: "Invalid data" });
      }
      req.failed = false;
    }
  );

  if (req.failed == false) {
    await db.query(
      `SELECT * FROM api_keys WHERE ID = ${db.escape(
        ID
      )} AND AppName = ${db.escape(AppName)};`,
      async (err, result) => {
        if (err) return res.status(500).json({ err: err.sqlMessage });
        else if (!result[0])
          return res.status(400).json({ err: "Invalid data" });

        try {
          const token = await jwt.sign(
            {
              AppName: result[0].AppName,
              ApiKey: result[0].ApiKey,
            },
            process.env.APIKEYSECRET
          );
          return res.status(200).json({ token });
        } catch (error) {
          return res
            .status(error.status || 500)
            .json({ err: error.msg || error });
        }
      }
    );
  }
};

module.exports = RefreshAPIAccess;
