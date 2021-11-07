import { NextFunction, Request, RequestHandler } from "express";
import { UserModel } from "../models/User.model";
import jwt from "jsonwebtoken";
import { environment } from "../utils/environment";

export const tokenParser: RequestHandler = (request, response, next) => {
   const token = extractToken(request);
   if (token) {
      jwt.verify(token, environment.security.apiSecret, applyBearer(request, next))
   } else {
      next();
   }
}

function extractToken(request: Request): string | undefined {
   //header
   //Authorization: Bearer token

   const authorization: string | undefined = request.header("authorization")
   if (authorization && authorization.startsWith("Bearer ")) {
      return authorization.substring(7)
   }
}

function applyBearer(request: Request, next: NextFunction): (error: any, decoded: any) => void {
   return (error, decoded) => {
      if (decoded) {
         UserModel.findOne({ email: decoded.sub })
            .then(user => {
               if (user) {
                  //@ts-ignore
                  request.authenticated = user
               }
               next();
            })
            .catch(next)
      } else {
         next();
      }
   }
}