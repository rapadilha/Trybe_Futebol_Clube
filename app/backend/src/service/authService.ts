import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

const authService = {
  async token(email: string) {
    const token = jwt.sign({ data: email }, secret);

    return token;
  },

  async decode(authorization: string) {
    const tokenDecode = jwt.verify(authorization, secret);

    return tokenDecode;
  },
};

export default authService;
