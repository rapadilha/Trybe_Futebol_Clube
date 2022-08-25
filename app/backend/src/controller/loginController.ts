import { NextFunction, Request, Response } from 'express';
import { ValidateBody } from '../interface/loginInterface';

export default class LoginController {
  constructor(private loginService: ValidateBody) {}

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.loginService.validateBody(req.body);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
