import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

export default class teamsController {
  static async getAll(_request: Request, response: Response): Promise<object> {
    const allTeams = await teamsService.getAll();
    console.log('todos os users');
    return response.status(200).json(allTeams);
  }

  static async getTeamById(request: Request, response: Response): Promise<object> {
    const { id } = request.params;
    const team = await teamsService.getTeamById(Number(id));
    // console.log('team by id');
    return response.status(200).json(team);
  }
}
