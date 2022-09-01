import { NextFunction, Request, Response } from 'express';
import MatchesBody from '../interface/matchesInterface';

export default class MatchesController {
  constructor(private matchesService: MatchesBody) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query.inProgress as string | undefined;
      if (query !== undefined) {
        const matches = await this.matchesService.getInProgress(query);

        res.status(200).json(matches);
      }
      const matches = await this.matchesService.getMatches();

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (authorization !== undefined) {
        const create = await this.matchesService.createMatch(req.body);

        res.status(201).json(create);
      }
    } catch (error) {
      next(error);
    }
  }
}
