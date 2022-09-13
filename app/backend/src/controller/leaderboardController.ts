import { NextFunction, Request, Response } from 'express';
import LeaderBorardBody from '../interface/leaderboardInterface';

export default class LeaderBoardController {
  constructor(private leaderboardService: LeaderBorardBody) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leaderboardService.leaderBoard();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAway(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leaderboardService.leaderBoardAway();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getFull(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.leaderboardService.fullLeaderBoard();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
