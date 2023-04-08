import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardServices';

export default class leaderboardController {
  static async getLeaderboard(_request: Request, response: Response): Promise<object> {
    const leaderboard = await leaderboardService.getLeaderboard();
    console.log('todos os leaderboard', leaderboard);
    return response.status(200).json(leaderboard);
  }
}
