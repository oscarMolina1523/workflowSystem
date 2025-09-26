import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PublicUser } from "../../Domain.Endpoint/dtos/user.dto";
dotenv.config();


export function generateAccesToken(user: PublicUser) {
  const secret = process.env.SECRET;
  if (!secret)
    throw new Error("JWT SECRET is not defined in environment variables");

  return jwt.sign(user, secret, { expiresIn: "1d" });
}



export function validateToken(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.SECRET;
  if (!secret)
    throw new Error("JWT SECRET is not defined in environment variables");
  let accessToken = req.headers["authorization"] ;
  // Si no está en headers, revisa en la query
  //req.query.token <--ahi en token puedes cambiar la palabra por la que 
  //deseas que sea ya sea accessToken u otra por ahora debes poner token y el jsontoken
  if (!accessToken && req.query.token) {
    accessToken = req.query.token as string;
  }
  if (!accessToken) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  // Si el token viene con 'Bearer ', remuévelo
  const token = accessToken.startsWith("Bearer ")
    ? accessToken.slice(7)
    : accessToken;

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res
        .status(403)
        .json({ message: "Access denied. Token expired or incorrect." });
      return;
    } else {
      next();
    }
  });
}

export function decodeToken(req: Request): PublicUser {
  const secret = process.env.SECRET;
  if (!secret) throw new Error("JWT SECRET is not defined");

  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  const decoded = jwt.verify(token, secret) as PublicUser;
  return decoded;
}