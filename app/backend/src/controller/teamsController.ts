import { NextFunction, Request, Response } from 'express';
import TeamsBody from '../interface/teamsInterface';

export default class TeamsController {
  constructor(private teamsService: TeamsBody) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamsService.getTeams();
      console.log(teams);

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
