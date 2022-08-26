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

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (authorization !== undefined) {
        const role = await this.loginService.getRole(authorization);
        res.status(200).json(role);
      }
    } catch (error) {
      next(error);
    }
  }
}
