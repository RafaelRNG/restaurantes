import { NextFunction, Request, Response, Router } from "express";
import { isValidObjectId } from "mongoose";
import { RestaurantDocument, RestaurantModel } from "../models/Restaurant.model";
import { RestaurantValidation } from "../validations/Restaurant.validation";

class RestaurantRoutes {

   routes: Router;

   public constructor() {
      this.routes = Router();
      this.initRestaurantRoutes();
   }

   public initRestaurantRoutes(): void {

      this.routes.get("", (request: Request, response: Response) => {
         RestaurantModel.find()
            .then(restaurants => {
               response.status(200);
               return response.json(restaurants);
            })
      });

      this.routes.get("/:_id", (request: Request, response: Response, next: NextFunction) => {

         const isValidId = isValidObjectId(request.params._id);
         if (!isValidId) {
            response.status(404);
            return response.json({ message: "Restaurant not found!" });
         }

         RestaurantModel.findById(request.params._id).select(["name", "email"])
            .then(restaurant => {
               if (restaurant) {
                  response.status(200);
                  return response.json(restaurant)
               }
               response.status(404)
               response.json({ message: "Restaurant not found" });
            })
            .catch(error => {
               next(error);
            })
      });

      this.routes.get("/:_id/menu", (request: Request, response: Response, next: NextFunction) => {

         const isValidId = isValidObjectId(request.params._id);
         if (!isValidId) {
            response.status(404);
            return response.json({ message: "Restaurant not found!" });
         }

         RestaurantModel.findById(request.params._id, "+menu")
            .then(restaurant => {
               if (!restaurant) {
                  response.status(400);
                  return response.json({ message: "Restaurant not found" });
               }

               if (restaurant) {
                  response.status(200);
                  return response.json(restaurant.menu)
               }
            })
            .catch(next)
      });

      this.routes.post("", (request: Request, response: Response) => {
         const restaurant: RestaurantDocument = new RestaurantModel(request.body);
         const restaurantValidation = new RestaurantValidation();

         if (restaurantValidation.isRestaurantValid(request.body.name)) {
            restaurant.save()
               .then(result => {
                  response.status(201);
                  return response.json(result);
               })
               .catch(error => response.send(error));
         }

         if (!restaurantValidation.isRestaurantValid(request.body.name)) {
            response.status(400);
            return response.json({ message: "Name is required!" });
         }
      });

      this.routes.put("/:_id/menu", (request: Request, response: Response, next: NextFunction) => {

         const isValidId = isValidObjectId(request.params._id);
         if (!isValidId) {
            response.status(404);
            return response.json({ message: "Restaurant not found!" });
         }

         RestaurantModel.findById(request.params._id)
            .then(restaurant => {
               if (!restaurant) {
                  response.status(400);
                  return response.json({ message: "Restaurant not found" });

               } else {
                  restaurant.menu = request.body
                  restaurant.save()
                     .then(result => {
                        response.status(200);
                        return response.json(result.menu);
                     });
               }
            })
            .catch(next)

      });

      this.routes.patch("/:_id", (request: Request, response: Response) => {
         RestaurantModel.findByIdAndUpdate(request.params._id, request.body)
            .then(restaurant => {
               response.status(204);
               return response.send();
            })
            .catch(error => {
               response.status(400);
               return response.json(error);
            })
      });

      this.routes.delete("/:_id", (request: Request, response: Response) => {
         const isValidId = isValidObjectId(request.params._id);
         if (!isValidId) {
            response.status(404);
            return response.json({ message: "Restaurant not found!" });
         }

         RestaurantModel.findByIdAndDelete(request.params._id)
            .then(() => {
               response.status(204);
               return response.send();
            })
            .catch(error => {
               response.status(404);
               return response.json(error);
            });
      });
   }
}

export default new RestaurantRoutes().routes;