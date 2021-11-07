import { RequestHandler } from "express";

export const authorize: (...profiles: string[]) => RequestHandler = (...profiles: string[]) => {
   return (request, response, next) => {
      if ((<any>request).authenticated !== undefined && (<any>request).authenticated.hasAny(...profiles)) {
         next();
      } else {
         response.status(403);
         return response.json({ message: "Permission denied!" });
      }
   }
}