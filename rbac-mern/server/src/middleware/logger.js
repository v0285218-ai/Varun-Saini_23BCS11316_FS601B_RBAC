export const requestLogger = (req, _res, next) => {
  const user = req.user ? `${req.user.role}:${req.user.name}` : 'guest';
  console.log(`[REQ] ${req.method} ${req.url} by ${user}`);
  next();
};
