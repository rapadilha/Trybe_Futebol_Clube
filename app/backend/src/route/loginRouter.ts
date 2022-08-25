import { Router } from 'express';
import LoginService from '../service/loginService';
import LoginController from '../controller/loginController';

const loginRouter = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', (req, res, next) => loginController.post(req, res, next));

export default loginRouter;
