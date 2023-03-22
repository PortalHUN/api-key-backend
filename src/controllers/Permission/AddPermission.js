const db = require("../../utils/db");
const PermissionList = require("./PermissionList");

const AddPermission = async (req, res) => {
  const { ID, PermDesc } = req.body;
  if (!(ID || PermDesc)) return res.status(403).json({ err: "Invalid data" });
  else if (!PermissionList.includes(PermDesc)) return res.status(400).json({ err: "Invalid permission." });
  await db.query(`SELECT ID FROM api_keys WHERE ID = ${db.escape(ID)};`, async (error, found) => {
    if (error) return res.status(500).json({ err: "Database error: " + error.sqlMessage });
    else if (found.length == 0) return res.status(400).json({ err: "No App found." });
    await db.query(
      `INSERT INTO permissions (AppID, Perm) VALUES (${db.escape(ID)}, ${db.escape(PermDesc)});`,
      (error, result) => {
        if (error) return res.status(500).json({ err: "Database error: " + error.sqlMessage });
        else return res.status(200).json({ message: "Successfully added permission." });
      }
    );
  });
};

module.exports = AddPermission;
