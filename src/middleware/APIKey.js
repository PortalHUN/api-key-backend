const jwt = require("jsonwebtoken");
const db = require("../utils/db");

const apiKey = async (req, res, next) => {
  const jwtkey = req.headers["x-api-key"];
  if (!jwtkey) return res.status(400).json({ err: "No api key given" });
  try {
    const obj = await jwt.verify(jwtkey, process.env.APIKEYSECRET);
    await db.query(`SELECT * FROM api_keys WHERE AppName = ${db.escape(obj.AppName)};`, (error, result) => {
      try {
        if (error) throw "Database error msg: " + error;
        else if (result.length == 0) throw "No database rows found";
        else if (!(result[0].AppName == obj.AppName && result[0].ApiKey == obj.ApiKey && result[0].Blocked == 0))
          throw "Wrong Credentials";
        req.api = result[0];
        next();
      } catch (e) {
        return res.status(500).json({ err: e.message || e });
      }
    });
  } catch (error) {
    return res.status(500).json({ err: error.message || error ? "Invalid JWT Token" : error });
  }
};

module.exports = apiKey;
