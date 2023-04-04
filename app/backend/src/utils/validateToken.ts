import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

async function valid(req: Request, res: Response, next: NextFunction): Promise<object | undefined> {
  try {
    const { authorization } = req.headers;
    const secret = process.env.JWT_SECRET || 'secret';

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = jwt.verify(authorization, secret);
    req.cookies = payload;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
}
export default valid;
