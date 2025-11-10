import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { can } from '../middleware/can.js';
import { PERMS } from '../config/permissions.js';
import { User } from '../models/User.js';

const r = Router();

r.use(authRequired);

r.get('/', can(PERMS.USERS_MANAGE), async (_req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

r.patch('/:id/role', can(PERMS.USERS_MANAGE), async (req, res) => {
  const { role } = req.body;
  const u = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-passwordHash');
  res.json(u);
});

export default r;
