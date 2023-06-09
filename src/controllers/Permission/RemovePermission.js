const db = require("../../utils/db");

const RemovePermission = async (req, res) => {
  const { ID, permissions } = req.body;
  if (!ID || !permissions || permissions.length == 0) return res.status(403).json({ err: "Invalid data" });

  await db.query(`SELECT Perm FROM permissions WHERE AppID = ${db.escape(ID)};`, async (error, userP) => {
    if (error) return res.status(500).json({ err: "Database error: " + error.sqlMessage });
    else if(!userP || userP.length == 0) return res.status(400).json({err:"No App found with this ID"});

    let userPermission = [];
    userP.forEach((element) => {
      userPermission.push(element.Perm);
    });

    let correct = [];
    permissions.forEach(async (element) => {
      if (userPermission.includes(element)) correct.push(element);
    });
    if(correct.length == 0 || !correct) return res.status(400).json({err:"This user already doesn't have these permissions"})

    correct.forEach(async (element) => {
      await db.query(
        `DELETE FROM permissions WHERE AppID = ${db.escape(ID)} AND Perm = ${db.escape(element)}`,
        (error, result) => {
          if (error) return res.status(500).json({ err: "Database error: " + error.sqlMessage });
        }
      );
    });

    return res.status(200).json({ message: "Successfully removed permissions", removed: correct });
  });
};

module.exports = RemovePermission;
