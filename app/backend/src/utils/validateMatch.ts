import { NextFunction, Request, Response } from 'express';
import Teams from '../database/models/teamsModel';

async function match(req: Request, res: Response, next: NextFunction): Promise<object | undefined> {
  const { homeTeamId, awayTeamId } = req.body;
  const equalTeam = 'It is not possible to create a match with two equal teams';
  const notFoundId = 'There is no team with such id!';

  // Validar se os times são diferentes.
  if (homeTeamId === awayTeamId) return res.status(422).json({ message: equalTeam });

  // Validar se o ID dos times são existentes.
  const hTId = await Teams.findByPk(homeTeamId);
  const aTId = await Teams.findByPk(awayTeamId);
  if (!hTId || !aTId) return res.status(404).json({ message: notFoundId });
  next();
}

export default match;
