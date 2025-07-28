const AuthorizedAccess = (...allowedRoles) => {
    return (req,res,next)=>{
      const role = req.role;
      if (!role) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: no user role found. Please login first.'
        });
      }
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          status: 'error',
          message: `Forbidden: Access allowed only for roles: [${allowedRoles.join(', ')}]`
        });
      }
      next()
    }
}
module.exports = AuthorizedAccess;