import { Post } from '../models/Post.js';
import { ROLES } from '../config/permissions.js';

export const ownsPostOrAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (user.role === ROLES.ADMIN) return next();

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  if (String(post.authorId) !== user.sub) {
    return res.status(403).json({ error: 'Not owner' });
  }

  next();
};
