import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardServices';

export default class leaderboardController {
  static async getLeaderboard(request: Request, response: Response): Promise<object> {
    const url = request.originalUrl;
    const leaderboard = await leaderboardService.getLeaderboard(url.split('/')[2]);
    // console.log('todos os leaderboard', leaderboard);
    return response.status(200).json(leaderboard);
  }
}
