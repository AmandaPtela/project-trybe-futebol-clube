import { Request, Response } from 'express';
import userService from '../services/userService';

export default class usersController {
  static async getAll(_request: Request, response: Response): Promise<object> {
    const allUsers = await userService.getAll();
    console.log('todos os users');
    return response.status(200).json(allUsers);
  }
}
