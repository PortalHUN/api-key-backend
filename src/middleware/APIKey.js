const jwt = require("jsonwebtoken");
const db = require("../utils/db");

const apiKey = async (req, res, next) => {
  const jwtkey = req.headers["x-api-key"];
  if (!jwtkey) return res.status(400).json({ err: "No api key given" });
  try {
    const obj = await jwt.verify(jwtkey, process.env.APIKEYSECRET);
    await db.query(`SELECT * FROM api_keys WHERE AppName = ${db.escape(obj.AppName)};`, async (error, result) => {
      try {
        if (error) throw "Database error msg: " + error;
        else if (result.length == 0) throw "No database rows found";
        else if (!(result[0].AppName == obj.AppName && result[0].ApiKey == obj.ApiKey && result[0].Blocked == 0))
          throw "Wrong Credentials";
        else {
          req.api = result[0];
          await db.query(`SELECT Perm FROM permissions WHERE AppID = ${result[0].ID};`, (error, perms) => {
            if (error) return res.status(500).json({ err: error.sqlMessage });
            let per = [];
            perms.forEach((element) => {
              per.push(element.Perm.replace(/(\r\n|\n|\r)/gm, ""));
            });
            req.api.permissions = per;
            next();
          });
        }
      } catch (e) {
        return res.status(500).json({ err: e.message || e });
      }
    });
  } catch (error) {
    return res.status(500).json({ err: error.message || error ? "Invalid JWT Token" : error });
  }
};

module.exports = apiKey;
