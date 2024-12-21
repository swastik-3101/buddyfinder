import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/users.json');

export const readUsersFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(dataPath, '[]');
      return [];
    }
    throw error;
  }
};

export const writeUsersFile = async (users) => {
  await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
};
