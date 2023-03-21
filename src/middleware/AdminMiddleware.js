const AdminMiddleware = (req, res, next) => {
  if (!req.api.Admin) return res.status(403).json({ err: "You must have Admin privileges to use this!" });
  else next();
};

module.exports = AdminMiddleware;
