import * as express from 'express';
import matchesController from './controllers/matchesController';
import teamsController from './controllers/teamsController';
import usersController from './controllers/usersController';
import valid from './utils/validateToken';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.get('/teams', teamsController.getAll);
    this.app.get('/users', usersController.getAll);
    this.app.get('/matches', matchesController.getAll);
    this.app.post('/login', usersController.login);
    this.app.get('/login', valid, usersController.validate);
    this.app.get('/teams/:id', teamsController.getTeamById);
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
