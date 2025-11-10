import { denyByDefault } from '../config/permissions.js';

export const can = (permission) => {
  return (req, res, next) => {
    const role = req.user?.role;

    if (!denyByDefault(role, permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};
