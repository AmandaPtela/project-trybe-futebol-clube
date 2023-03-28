import { Request, Response } from 'express';
import userService from '../services/userService';

export default class usersController {
  static async getAll(_request: Request, response: Response): Promise<object> {
    const allUsers = await userService.getAll();
    console.log('todos os users');
    return response.status(200).json(allUsers);
  }

  static async login(request: Request, response: Response): Promise<object> {
    const user = request.body;
    const login: number | string = await userService.login(user);
    if (login === 400) return response.status(login).json({ message: 'All fields must be filled' });
    // console.log('login');
    return response.status(200).json({ token: login });
  }
}
