import * as express from 'express';
import matchesController from './controllers/matchesController';
import teamsController from './controllers/teamsController';
import usersController from './controllers/usersController';
import leaderboardController from './controllers/leaderboardController';
import valid from './utils/validateToken';
import login from './utils/validateLogin';
import match from './utils/validateMatch';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    this.app.get('/teams', teamsController.getAll);
    this.app.get('/users', usersController.getAll);
    this.app.get('/matches', matchesController.getAll);
    this.app.patch('/matches/:id/finish', valid, matchesController.finishMatch);
    this.app.patch('/matches/:id', valid, matchesController.updateMatch);
    this.app.post('/matches', valid, match, matchesController.createMatch);
    this.app.post('/login', login, usersController.login);
    this.app.get('/login/role', valid, usersController.validate);
    this.app.get('/teams/:id', teamsController.getTeamById);
    this.app.get('/leaderboard/home', leaderboardController.getLeaderboard);
    this.app.get('/leaderboard/away', leaderboardController.getLeaderboard);
    this.app.get('/leaderboard', leaderboardController.getAllLeaderboard);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
