import { NextFunction, Request, Response } from 'express';
import MatchesBody from '../interface/matchesInterface';

export default class MatchesController {
  constructor(private matchesService: MatchesBody) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.matchesService.getMatches();

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
