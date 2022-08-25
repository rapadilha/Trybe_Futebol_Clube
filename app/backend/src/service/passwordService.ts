import * as bcrypt from 'bcryptjs';

const passwordService = {
  encryptPassword: (password: string) => {
    const salt = bcrypt.genSaltSync(6);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },

  compareEncrypt: (password: string, hash: string) => {
    const encryptedPassword = bcrypt.compare(password, hash);

    return encryptedPassword;
  },
};

export default passwordService;
