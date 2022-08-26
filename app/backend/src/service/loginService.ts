import * as Joi from 'joi';
import Login, { ValidateBody, Decoded } from '../interface/loginInterface';
import Users from '../database/models/users';
import authService from './authService';
import { throwInvalidError } from '../middlewares/utils';
import passwordService from './passwordService';

const schema = Joi.object({
  email: Joi.string()
    .email()
    .max(255)
    .required()
    .messages({
      'string.empty': 'All fields must be filled',
    }),

  password: Joi.string()
    .min(7)
    .required()
    .messages({
      'string.empty': 'All fields must be filled',
    }),
});

export default class LoginService implements ValidateBody {
  constructor(private model = Users) {}

  async validateBody(body: Login): Promise<string> {
    await schema.validateAsync(body);

    const user = await this.model.findOne({
      where: { email: body.email } });

    if (!user || undefined) return throwInvalidError('Incorrect email or password');

    const checkPassword = await passwordService.compareEncrypt(body.password, user.password);

    if (!checkPassword) return throwInvalidError('Incorrect email or password');

    const result = await authService.token(user?.email);

    return result;
  }

  async getRole(authorization: string):Promise<object | string | undefined> {
    if (!authorization) return throwInvalidError('Invalid Token');

    const decoded = await authService.decode(authorization) as Decoded;

    const user = await this.model.findOne({
      where: { email: decoded.data } });

    const role = { role: user?.role };

    return role;
  }
}
