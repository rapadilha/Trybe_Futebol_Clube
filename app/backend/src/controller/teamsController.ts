import { NextFunction, Request, Response } from 'express';
import TeamsBody from '../interface/teamsInterface';

export default class TeamsController {
  constructor(private teamsService: TeamsBody) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamsService.getTeams();

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const teams = await this.teamsService.getTeamsId(id);

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
