export const ROLES = {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER'
};

export const PERMS = {
  POSTS_CREATE: 'posts:create',
  POSTS_READ: 'posts:read',
  POSTS_UPDATE: 'posts:update',
  POSTS_DELETE: 'posts:delete',
  USERS_MANAGE: 'users:manage'
};

export const ROLE_PERMISSIONS = {
  ADMIN: [
    PERMS.POSTS_CREATE,
    PERMS.POSTS_READ,
    PERMS.POSTS_UPDATE,
    PERMS.POSTS_DELETE,
    PERMS.USERS_MANAGE
  ],
  EDITOR: [
    PERMS.POSTS_CREATE,
    PERMS.POSTS_READ,
    PERMS.POSTS_UPDATE
  ],
  VIEWER: [
    PERMS.POSTS_READ
  ]
};

export const denyByDefault = (role, perm) => ROLE_PERMISSIONS[role]?.includes(perm) || false;
