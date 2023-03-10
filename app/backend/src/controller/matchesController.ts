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
        await this.matchesService.validateToken(authorization);

        const create = await this.matchesService.createMatch(req.body);

        res.status(201).json(create);
      }
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (authorization !== undefined) {
        const { id } = req.params;
        const finish = await this.matchesService.finishMatch(id);

        res.status(200).json(finish);
      }
    } catch (error) {
      next(error);
    }
  }

  async patchGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const gol = await this.matchesService.updateMatchGoals(id, req.body);
      console.log(gol);

      res.status(200).json(gol);
    } catch (error) {
      next(error);
    }
  }
}
