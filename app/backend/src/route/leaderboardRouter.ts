import { Router } from 'express';
import LeaderBoardController from '../controller/leaderboardController';
import LeaderBoardService from '../service/leaderboardService';

const leaderboardRouter = Router();

const leaderboardService = new LeaderBoardService();
const leaderboardController = new LeaderBoardController(leaderboardService);

leaderboardRouter.get('/away', (req, res, next) => leaderboardController.getAway(req, res, next));

leaderboardRouter.get('/home', (req, res, next) => leaderboardController.get(req, res, next));

leaderboardRouter.get('/', (req, res, next) => leaderboardController.getFull(req, res, next));

export default leaderboardRouter;
