import * as jwt from 'jsonwebtoken';

const configJwt: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'secret';

export function generateToken(payload: object) {
  const token: string = jwt.sign(payload, secret, configJwt);
  return token;
}

export function decode(token: string) {
  const decoded = jwt.verify(token, secret, configJwt);
  return decoded;
}
