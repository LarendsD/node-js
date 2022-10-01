import * as brypt from 'bcrypt';

export const encrypt = (password: string) => {
  return brypt.hashSync(password, 10);
};
