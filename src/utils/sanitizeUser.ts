import { UserData } from '@/models/user/user-model';

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const sanitizers = {
  DB: {
    name: (v: string) => v.trim().replace(/\s+/g, ' ').toLowerCase(),
    email: (v: string) => v.trim().replace(/\s+/g, ' ').toLowerCase(),
  },

  FRONT: {
    name: (v: string) => {
      let formatName = v
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(capitalize)
        .join(' ');

      return formatName;
    },
    email: (v: string) => v,
  },
};

export function sanitizeUser(user: UserData, type: 'DB' | 'FRONT'): UserData {
  return {
    ...user,
    name: sanitizers[type].name(user.name),
    email: sanitizers[type].email(user.email),
  };
}

export function sanitizeLogin(data: { email: string; password: string }, type: 'DB' | 'FRONT') {
  return {
    ...data,
    email: sanitizers[type].email(data.email),
  };
}

