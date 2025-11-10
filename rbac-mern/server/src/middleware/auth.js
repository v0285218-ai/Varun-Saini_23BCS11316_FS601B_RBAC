import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization?.startsWith('Bearer ') &&
        req.headers.authorization.split(' ')[1]);

    if (!token) return res.status(401).json({ error: 'No token' });

    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data; // { sub, role, name }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid / expired token' });
  }
};

export const signTokens = (payload) => {
  return {
    access: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })
  };
};
