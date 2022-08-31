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

  // async getInProgress(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const query = req.query.inProgress as string | undefined;
  //     if (query !== undefined) {
  //       const matches = await this.matchesService.getInProgress(query);

  //       res.status(200).json(matches);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
