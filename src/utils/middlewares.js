import { verifyJWTAndGetPayload, hashPassword, compairePwd, signJWT, refreshJWT } from "./auth";
import { getByUsername, createOne } from "../resources/member/member.model";

 export const jwtAuth = () => function verifyToken(req,res,next) {
  req.user = undefined;
  if (req.headers && req.headers.authorization) {
    const [bearer, token] = req.headers.authorization.split(' ');
    if (token && bearer== 'Bearer') {
      const payload = verifyJWTAndGetPayload(token);
      if (payload)
        req.user = payload.user;
    } 
  }
  next();
}

export function register(req, res) {
  req.body.hash_pwd = hashPassword(req.body.hash_pwd);
  createOne(req, function respond(err, result) {
    if (err)
      return res.status(400).end(err.message);
    const newUser = result.rows[0];

    return res.status(201).json([{...newUser, hash_pwd: undefined }]);
  })
}

export function login(req, res) {
  getByUsername(req, function verifyAndSign(err, result) {
    if (err)
      return res.status(400).end(err.message);

    const user = result.rows[0];
    
    if (!user || !req.body.password)
      return res.status(401).end("Invalid login data!");
    
    const isCorrectPassword = compairePwd(req.body.password, user.hash_pwd);

    if (!isCorrectPassword)
      return res.status(401).end("Invalid login data!");
    
    user.hash_pwd = undefined;
    const token = signJWT({...user});
    return res.status(200).json({token});

  })
}

export function refreshToken(req, res) {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const newToken = refreshJWT(token);
    if (newToken)
      return res.status(200).json({newToken});
    else
      return res.status(400).end();
  }
  else
    return res.status(400).end();
}

export function requireLogin(req, res, next) {
  if (req.user)
    return next();
  else return res.status(401).json({message: "Unauthorized user!"});
}
