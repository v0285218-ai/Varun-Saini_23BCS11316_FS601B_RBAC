import dotenv from 'dotenv';
import { connectDB } from '../src/db.js';
import { User } from '../src/models/User.js';
import { Post } from '../src/models/Post.js';
import { ROLES } from '../src/config/permissions.js';

dotenv.config();

const run = async () => {
  await connectDB(process.env.MONGO_URI);

  await User.deleteMany({});
  await Post.deleteMany({});

  const admin = new User({ email: 'admin@cu.test', name: 'Admin', role: ROLES.ADMIN });
  await admin.setPassword('Admin#123'); await admin.save();

  const editor = new User({ email: 'editor@cu.test', name: 'Editor', role: ROLES.EDITOR });
  await editor.setPassword('Editor#123'); await editor.save();

  const viewer = new User({ email: 'viewer@cu.test', name: 'Viewer', role: ROLES.VIEWER });
  await viewer.setPassword('Viewer#123'); await viewer.save();

  await Post.create([
    { title: 'Welcome', body: 'Public post', authorId: admin._id, published: true },
    { title: 'Draft By Editor', body: 'Only editor/admin can see/edit', authorId: editor._id, published: false }
  ]);

  console.log('✅ Seed complete');
  process.exit(0);
};

run();
