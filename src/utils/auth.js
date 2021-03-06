import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';

export function hashPassword(pwd, SALT_ROUNDS=config.BCRYPT_ROUNDS) {
  return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

export function compairePwd(pwd, hashedPwd) {
  return bcrypt.compareSync(pwd, hashedPwd);
}

export function signJWT(payload, secret=config.JWT_SECRET, exp=config.JWT_EXPIRES_IN) {
  return jwt.sign({user: payload}, secret, { expiresIn: exp});
}

export function verifyJWTAndGetPayload(token, secret=config.JWT_SECRET) {
  let decodedPayload = undefined;
  jwt.verify(token, secret, function decodePayload(err, payload) {
    if (!err) decodedPayload = payload;
    else console.error(err.message);
  });
  return decodedPayload;
}

export function refreshJWT(currentJWT, secret=config.JWT_SECRET, exp=config.JWT_EXPIRES_IN) {
  const payload = verifyJWTAndGetPayload(currentJWT, secret);

  if(!payload) return undefined;
  
  const nowInSec = Math.round(new Date()/1000);
  const expiresIN = payload.exp - nowInSec;
  const enoughTimeElapsed = expiresIN < config.JWT_REFRESH_THRESHOLD;
  
  let newToken = undefined;
  if (enoughTimeElapsed) {
    newToken = signJWT(payload.user, secret, exp);
  }
  return newToken;
}
