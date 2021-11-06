import { RequestHandler } from "express";
import { UserModel } from "../models/User.model";
import jwt from "jsonwebtoken";
import { environment } from "../utils/environment";

export const authenticate: RequestHandler = (request, response, next) => {
   const { email, password } = request.body

   UserModel.findOne({ email })
      .then(user => {
         if (user && user.matches(password)) {
            const token = jwt.sign({
               sub: user.email,
               iss: "rng-api",
            }, environment.security.apiSecret)

            response.status(200);
            response.json({ name: user.name, email: user.email, accessToken: token });
         } else {
            response.status(401);
            return response.json({ message: "User not exists or not authorized" });
         }
      })
      .catch(next)
}
