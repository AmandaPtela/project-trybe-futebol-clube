import { Request, Response } from 'express';
import userService from '../services/userService';

export default class usersController {
  static async getAll(_request: Request, response: Response): Promise<object> {
    const allUsers = await userService.getAll();
    // console.log('todos os users');
    return response.status(200).json(allUsers);
  }

  static async login(request: Request, response: Response): Promise<object> {
    const user = request.body;
    const login: string = await userService.login(user);
    if (login.length > 30) return response.status(200).json({ token: login });
    return response.status(401).json({ message: login });
  }

  static async validate(request: Request, response: Response): Promise<object> {
    const user = request.cookies;
    const userOk: string | undefined = await userService.validate(user);
    return response.status(200).json({ role: userOk });
  }
}
