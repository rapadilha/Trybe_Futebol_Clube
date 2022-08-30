import { Router } from 'express';
import MatchesService from '../service/matchesService';
import MatchesController from '../controller/matchesController';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

// matchesRouter.get('/:id', (req, res, next) => matchesController.getId(req, res, next));

matchesRouter.get('/', (req, res, next) => matchesController.get(req, res, next));

export default matchesRouter;
