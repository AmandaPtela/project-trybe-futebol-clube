import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

export default class matchesController {
  static async getAll(request: Request, response: Response): Promise<object> {
    const query = request.query.inProgress;
    console.log(query);
    const matches = await matchesService.getAll(String(query));
    // console.log('todos os matches');
    return response.status(200).json(matches);
  }

  static async finishMatch(request: Request, response: Response): Promise<object> {
    const { id } = request.params;
    await matchesService.finishMatch(Number(id));
    return response.status(200).json({ message: 'Finished' });
  }

  static async updateMatch(request: Request, response: Response): Promise<object> {
    const { id } = request.params;
    const change = request.body;
    const updated = await matchesService.updateMatch(Number(id), change);
    return response.status(200).json(updated);
  }

  static async createMatch(request: Request, response: Response): Promise<object> {
    const matchInfos = request.body;
    const created = await matchesService.createMatch(matchInfos);
    return response.status(201).json(created);
  }
}
