import { Router } from 'express';
import { User } from '../models/User.js';
import { signTokens } from '../middleware/auth.js';
import { rateLimit } from '../middleware/ratelimit.js';
import { requestLogger } from '../middleware/logger.js';
import { audit } from '../middleware/audit.js';

const r = Router();
r.use(requestLogger);


// REGISTER (for seeding / manual testing)
r.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'Email already in use' });

  const u = new User({ name, email, role });
  await u.setPassword(password);
  await u.save();

  return res.json({ ok: true });
});

// LOGIN
r.post('/login', rateLimit(5, 60_000), audit('LOGIN_ATTEMPT'), async (req, res) => {
  const { email, password } = req.body;

  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await u.validatePassword(password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const tokens = signTokens({ sub: u._id, role: u.role, name: u.name });

  res.cookie('accessToken', tokens.access, {
    httpOnly: true,
    sameSite: 'lax'
  });

  return res.json({
    user: { id: u._id, name: u.name, role: u.role }
  });
});

// LOGOUT
r.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  return res.json({ ok: true });
});

export default r;
