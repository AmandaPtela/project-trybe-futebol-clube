import { NextFunction, Request, Response } from 'express';

async function login(req: Request, res: Response, next: NextFunction): Promise<object | undefined> {
  const { email, password } = req.body;
  const emptyMe = 'All fields must be filled';

  // Validar email e senha existentes.
  if (!email || !password) return res.status(400).json({ message: emptyMe });
  next();
}

export default login;
