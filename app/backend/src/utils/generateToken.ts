import * as jwt from 'jsonwebtoken';

const configJwt: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function generateToken(payload: object) {
  const token: string = jwt.sign(payload, 'secret', configJwt);
  return token;
}

export default generateToken;
