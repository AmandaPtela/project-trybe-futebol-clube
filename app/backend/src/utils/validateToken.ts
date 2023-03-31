import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
// import Users from '../database/models/usersModel';
// const userService = require('../SERVICES/userService');

async function valid(req: Request, res: Response, next: NextFunction): Promise<object | undefined> {
  try {
    const { authorization } = req.headers;
    const secret = 'secret';

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = jwt.verify(authorization, secret);
    console.log(payload);
    req.cookies = payload;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
}
export default valid;
