const requireUser = ((req, res, next) => {
  if (!req.user) {
    res.status(401)
    res.send({
      success: false,
      error: 'UnauthorizedError',
      message: "You must be logged in to perform this action"
    });
    return;
  };
  next();
});

const requireAdmin = ((req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(401)
    res.send({
      success: false,
      error: 'UnauthorizedUserError',
      message: "You must be an admininstrator to complete this action"
    });
    return;
  };
  next();
});

module.exports = {
  requireUser,
  requireAdmin
};