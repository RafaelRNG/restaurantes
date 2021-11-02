import { Router, Request, Response, NextFunction } from "express";
import { UserModel, UserDocument } from "../models/User.model";
import { isValidObjectId } from "mongoose";
import { UserValidation } from "../validations/User.validation";
import { hashSync } from "bcrypt";

class UserRoutes {

   routes: Router;

   public constructor() {
      this.routes = Router();
      this.initUserRoutes();
   }
   
   initUserRoutes(): void {
      this.routes.get("", (request: Request, response: Response) => {
         UserModel.find().select(["name", "email"])
            .then(users => {
               response.status(200);
               return response.json(users);
            })
            .catch(error => {
               response.status(400);
               return response.json({ error });
            })
      });

      this.routes.get("/:_id", (request: Request, response: Response, next: NextFunction) => {

         const isValidId = isValidObjectId(request.params._id);
         if (!isValidId) {
            response.status(404);
            return response.json({ message: "User not found!" });
         }

         UserModel.findById(request.params._id)
            .select(["name", "email"])
            .then(user => {
               if (user) {
                  response.status(200);
                  return response.json(user)
               }
               response.status(201)
               response.json({ message: "User not found" });
            })
            .catch(error => {
               next(error);
            })
      });

      this.routes.post("", (request: Request, response: Response) => {
         const user: UserDocument = new UserModel(request.body);
         const userValidation = new UserValidation();
         const userValid = userValidation.userIsValid(request.body);

         userValidation.isEmail(request.body.email).then(value => {
            if (value === false) {

               if (userValid.isValid) {
                  user.save()
                     .then(user => {
                        let res = { user: user._id, name: user.name, email: user.email, gender: user.gender, cpf: user.cpf };
                        response.status(201);
                        return response.json(res);
                     })
               }

               if (!userValid.isValid) {
                  response.status(400);
                  return response.json(userValid.responses);
               }
            }

            if (value === true) {
               response.status(400);
               return response.json({ message: "user already exists!" });
            }
         });
      });

      this.routes.patch("/:_id", (request: Request, response: Response) => {
         const userValidation = new UserValidation();
         userValidation.isEmail(request.body.email)
            .then(isExists => {
               if (isExists === false) {
                  UserModel.findByIdAndUpdate(
                     { _id: request.params._id },
                     { name: request.body.name, email: request.body.email, password: hashSync(request.body.password, 10), gender: request.body.gender }, {
                     new: true, runValidators: true
                  })
                     .then(user => {
                        if (user) {
                           response.status(204);
                           return response.send();
                        }
                        response.status(404);
                        return response.json({ message: "User not found!" });
                     });
               } if (isExists === true) {
                  response.status(400);
                  return response.json({ message: "user already exists!" });
               }
            })
      });

      this.routes.delete("/:_id", (request: Request, response: Response) => {

         const isValidId = isValidObjectId(request.params._id);
         if (!isValidId) {
            response.status(404);
            return response.json({ message: "User not found!" });
         }

         UserModel.findByIdAndDelete(request.params._id)
            .then(() => {
               response.status(204);
               return response.send();
            }).catch(error => {
               response.status(400);
               return response.json({ message: "Bad request", error });
            });
      });
   }
}

export default new UserRoutes().routes;
