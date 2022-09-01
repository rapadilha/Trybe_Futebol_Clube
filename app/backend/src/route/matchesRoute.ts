import { Router } from 'express';
import MatchesService from '../service/matchesService';
import MatchesController from '../controller/matchesController';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', (req, res, next) => matchesController.get(req, res, next));

matchesRouter.post('/', (req, res, next) => matchesController.post(req, res, next));

matchesRouter.patch('/:id/finish', (req, res, next) => matchesController.patch(req, res, next));

export default matchesRouter;
