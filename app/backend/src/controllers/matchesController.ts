import { Request, Response } from 'express';
import matchesService from '../services/teamsService';

export default class matchesController {
  static async getAll(_request: Request, response: Response): Promise<object> {
    const allMatches = await matchesService.getAll();
    // console.log('todos os matches');
    return response.status(200).json(allMatches);
  }
}
