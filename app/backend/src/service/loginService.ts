import * as Joi from 'joi';
import Login, { ValidateBody } from '../interface/loginInterface';
import Users from '../database/models/users';
import authService from './authService';
import throwUnexistUserError from '../middlewares/utils';
import passwordService from './passwordService';

const schema = Joi.object({
  email: Joi.string()
    .email()
    .max(255)
    .required(),

  password: Joi.string()
    .min(6)
    .required(),
});

export default class LoginService implements ValidateBody {
  constructor(private model = Users) {}

  async validateBody(body: Login): Promise<string> {
    await schema.validateAsync(body);

    const user = await this.model.findOne({
      where: { email: body.email } });

    if (!user || undefined) return throwUnexistUserError('User not found');

    const checkPassword = await passwordService.compareEncrypt(body.password, user.password);

    if (!checkPassword) return throwUnexistUserError('User not found');

    const result = await authService.token(user?.email);

    return result;
  }
}
