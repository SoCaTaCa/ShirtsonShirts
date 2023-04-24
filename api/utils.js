const requireUser =((req, res, next) => {
    if (!req.user) {
      res.status(401)
      res.send({
        success: false,
        error: 'UnauthorizedError',
        message: "You must be logged in to perform this action"
      });
      return;
    }
    next();
}) 
// requireAdminUser

module.exports = requireUser;