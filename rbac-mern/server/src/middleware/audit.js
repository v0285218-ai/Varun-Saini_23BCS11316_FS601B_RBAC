export const audit = (action) => {
  return (req, _res, next) => {
    const user = req.user ? `${req.user.role}:${req.user.name}` : 'guest';
    console.log(`[AUDIT] ${user} -> ${action}`);
    next();
  };
};
