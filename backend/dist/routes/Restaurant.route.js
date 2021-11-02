"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var Restaurant_model_1 = require("../models/Restaurant.model");
var Restaurant_validation_1 = require("../validations/Restaurant.validation");
var RestaurantRoutes = /** @class */ (function () {
    function RestaurantRoutes() {
        this.routes = express_1.Router();
        this.initRestaurantRoutes();
    }
    RestaurantRoutes.prototype.initRestaurantRoutes = function () {
        this.routes.get("", function (request, response) {
            Restaurant_model_1.RestaurantModel.find()
                .then(function (restaurants) {
                response.status(200);
                return response.json(restaurants);
            });
        });
        this.routes.get("/:_id", function (request, response, next) {
            var isValidId = mongoose_1.isValidObjectId(request.params._id);
            if (!isValidId) {
                response.status(404);
                return response.json({ message: "Restaurant not found!" });
            }
            Restaurant_model_1.RestaurantModel.findById(request.params._id).select(["name", "email"])
                .then(function (restaurant) {
                if (restaurant) {
                    response.status(200);
                    return response.json(restaurant);
                }
                response.status(404);
                response.json({ message: "Restaurant not found" });
            })
                .catch(function (error) {
                next(error);
            });
        });
        this.routes.get("/:_id/menu", function (request, response, next) {
            var isValidId = mongoose_1.isValidObjectId(request.params._id);
            if (!isValidId) {
                response.status(404);
                return response.json({ message: "Restaurant not found!" });
            }
            Restaurant_model_1.RestaurantModel.findById(request.params._id, "+menu")
                .then(function (restaurant) {
                if (!restaurant) {
                    response.status(400);
                    return response.json({ message: "Restaurant not found" });
                }
                if (restaurant) {
                    response.status(200);
                    return response.json(restaurant.menu);
                }
            })
                .catch(next);
        });
        this.routes.post("", function (request, response) {
            var restaurant = new Restaurant_model_1.RestaurantModel(request.body);
            var restaurantValidation = new Restaurant_validation_1.RestaurantValidation();
            if (restaurantValidation.isRestaurantValid(request.body.name)) {
                restaurant.save()
                    .then(function (result) {
                    response.status(201);
                    return response.json(result);
                })
                    .catch(function (error) { return response.send(error); });
            }
            if (!restaurantValidation.isRestaurantValid(request.body.name)) {
                response.status(400);
                return response.json({ message: "Name is required!" });
            }
        });
        this.routes.put("/:_id/menu", function (request, response, next) {
            var isValidId = mongoose_1.isValidObjectId(request.params._id);
            if (!isValidId) {
                response.status(404);
                return response.json({ message: "Restaurant not found!" });
            }
            Restaurant_model_1.RestaurantModel.findById(request.params._id)
                .then(function (restaurant) {
                if (!restaurant) {
                    response.status(400);
                    return response.json({ message: "Restaurant not found" });
                }
                else {
                    restaurant.menu = request.body;
                    restaurant.save()
                        .then(function (result) {
                        response.status(200);
                        return response.json(result.menu);
                    });
                }
            })
                .catch(next);
        });
        this.routes.patch("/:_id", function (request, response) {
            Restaurant_model_1.RestaurantModel.findByIdAndUpdate(request.params._id, request.body)
                .then(function (restaurant) {
                response.status(204);
                return response.send();
            })
                .catch(function (error) {
                response.status(400);
                return response.json(error);
            });
        });
        this.routes.delete("/:_id", function (request, response) {
            var isValidId = mongoose_1.isValidObjectId(request.params._id);
            if (!isValidId) {
                response.status(404);
                return response.json({ message: "Restaurant not found!" });
            }
            Restaurant_model_1.RestaurantModel.findByIdAndDelete(request.params._id)
                .then(function () {
                response.status(204);
                return response.send();
            })
                .catch(function (error) {
                response.status(404);
                return response.json(error);
            });
        });
    };
    return RestaurantRoutes;
}());
exports.default = new RestaurantRoutes().routes;
