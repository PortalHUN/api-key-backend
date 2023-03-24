const RequirePermission = (permissions) => {
  return (req, res, next) => {
    if (permissions.length == 0) return res.status(500).json({ err: "Coding error on " + req.url });
    let correct = [];
    permissions.forEach((element) => {
      if (req.api.permissions.includes(element)) correct.push(element);
    });
    if (correct.length == permissions.length) next();
    else return res.status(403).json({ err: "You don't have the permission to use this" });
  };
};

module.exports = RequirePermission;
