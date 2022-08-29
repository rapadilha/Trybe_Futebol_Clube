import { Router } from 'express';
import TeamsController from '../controller/teamsController';
import TeamsService from '../service/teamsService';

const teamsRouter = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouter.get('/:id', (req, res, next) => teamsController.getId(req, res, next));

teamsRouter.get('/', (req, res, next) => teamsController.get(req, res, next));

export default teamsRouter;
