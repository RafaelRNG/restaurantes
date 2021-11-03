import { Router, Request, Response, NextFunction } from "express";
import { ReviewModel, ReviewDocument } from "../models/Review.model";
import { isValidObjectId } from "mongoose";
import { isValidReview } from "../validations/Review.validation";

class ReviewRoutes {

   routes: Router;

   public constructor() {
      this.routes = Router();
      this.InitReviewRoute();
   }

   public InitReviewRoute() {

      this.routes.get("/:_restaurantId", (request: Request, response: Response) => {

         ReviewModel.find({ restaurant: request.params._restaurantId })
            .populate("restaurant", "name")
            .populate("user", "name")
            .then(reviews => {

               response.status(200);
               return response.json(reviews);
            })
      });

      this.routes.post("", (request: Request, response: Response) => {
         const review: ReviewDocument = new ReviewModel(request.body);
         const validReview = new isValidReview().reviewValidation(request.body);
         if (validReview.isValid) {
            review.save()
               .then(review => {
                  response.status(201);
                  return response.json(review);
               });
         } else {
            response.status(400);
            return response.json({ responses: validReview.responses });
         }
      });

      this.routes.delete("/:_id", (request: Request, response: Response, next: NextFunction) => {
         if (!isValidObjectId(request.params._id)) {
            response.status(400);
            return response.json({ message: "Review not found!" });
         } else {
            ReviewModel.findByIdAndDelete(request.params._id)
               .then(() => {
                  response.status(204);
                  return response.send();
               })
         }
      });
   }
}

export default new ReviewRoutes().routes;