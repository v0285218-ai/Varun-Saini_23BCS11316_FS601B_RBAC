import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { can } from '../middleware/can.js';
import { PERMS, ROLES } from '../config/permissions.js';
import { Post } from '../models/Post.js';
import { ownsPostOrAdmin } from '../middleware/ownership.js';

const r = Router();
r.use(authRequired);

// get posts (scoped)
r.get('/', can(PERMS.POSTS_READ), async (req, res) => {
  const { role, sub } = req.user;

  let filter = {};

  if (role === ROLES.EDITOR) {
    filter = { $or: [{ published: true }, { authorId: sub }] };
  }

  const posts = await Post.find(filter).sort({ createdAt: -1 });
  res.json(posts);
});

// create
r.post('/', can(PERMS.POSTS_CREATE), async (req, res) => {
  const created = await Post.create({ ...req.body, authorId: req.user.sub });
  res.json(created);
});

// update
r.patch('/:id', can(PERMS.POSTS_UPDATE), ownsPostOrAdmin, async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// delete
r.delete('/:id', can(PERMS.POSTS_DELETE), async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default r;
