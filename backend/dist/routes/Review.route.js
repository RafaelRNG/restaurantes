"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Review_model_1 = require("../models/Review.model");
var mongoose_1 = require("mongoose");
var Review_validation_1 = require("../validations/Review.validation");
var ReviewRoutes = /** @class */ (function () {
    function ReviewRoutes() {
        this.routes = express_1.Router();
        this.InitReviewRoute();
    }
    ReviewRoutes.prototype.InitReviewRoute = function () {
        this.routes.get("/:_restaurantId", function (request, response) {
            var pageSize = 4;
            var page = parseInt(request.query._page || 1);
            page = page > 0 ? page : 1;
            var skip = (page - 1) * pageSize;
            Review_model_1.ReviewModel.find({ restaurant: request.params._restaurantId })
                .skip(skip)
                .limit(pageSize)
                .populate("restaurant", "name")
                .populate("user", "name")
                .then(function (reviews) {
                response.status(200);
                return response.json(reviews);
            });
        });
        this.routes.post("", function (request, response) {
            var review = new Review_model_1.ReviewModel(request.body);
            var validReview = new Review_validation_1.isValidReview().reviewValidation(request.body);
            if (validReview.isValid) {
                review.save()
                    .then(function (review) {
                    response.status(201);
                    return response.json(review);
                });
            }
            else {
                response.status(400);
                return response.json({ responses: validReview.responses });
            }
        });
        this.routes.delete("/:_id", function (request, response, next) {
            if (!mongoose_1.isValidObjectId(request.params._id)) {
                response.status(400);
                return response.json({ message: "Review not found!" });
            }
            else {
                Review_model_1.ReviewModel.findByIdAndDelete(request.params._id)
                    .then(function () {
                    response.status(204);
                    return response.send();
                });
            }
        });
    };
    return ReviewRoutes;
}());
exports.default = new ReviewRoutes().routes;
