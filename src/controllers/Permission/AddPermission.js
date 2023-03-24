const db = require("../../utils/db");
const PermissionList = require("./PermissionList");

//Bulk add
const AddPermission = async (req, res) => {
  const { ID, permissions } = req.body;
  if (!ID || !permissions || permissions.length == 0) return res.status(403).json({ err: "Invalid data" });

  //Is there correct information we can use?
  //Check if user already has these permissions or if they are valid
  let correct = [];
  permissions.forEach((element) => {
    if (PermissionList.includes(element) && !req.api.permissions.includes(element)) correct.push(element);
  });

  if (correct.length == 0) return res.status(400).json({ err: "This user already has these permissions or they are invalid" });

  //User exists?
  await db.query(`SELECT ID FROM api_keys WHERE ID = ${db.escape(ID)};`, async (error, app) => {
    if (error) return res.status(500).json({ err: "Database error: " + error.sqlMessage });
    else if (app.lenght == 0) return res.status(400).json({ err: "No App found with this ID" });

    //Putting together the sql string
    let sqlString = `INSERT INTO permissions(AppID, Perm) VALUES `;
    for (let i = 0; i < correct.length; i++) {
      const element = correct[i];
      if (i == correct.length - 1) sqlString += `(${db.escape(ID)}, ${db.escape(element)});`;
      else sqlString += `(${db.escape(ID)}, ${db.escape(element)}), `;
    }

    //Inserting rows
    await db.query(sqlString, (error, result) => {
      if (error) return res.status(500).json({ err: "Database error: " + error.sqlMessage });
      else return res.status(200).json({ message: "Successfuly added permissions", added: correct });
    });
  });
};

module.exports = AddPermission;
