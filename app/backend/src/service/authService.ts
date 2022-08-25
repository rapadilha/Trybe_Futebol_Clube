import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

const authService = {
  async token(password: string) {
    const token = jwt.sign({ data: password }, secret);

    return token;
  },
};

export default authService;
