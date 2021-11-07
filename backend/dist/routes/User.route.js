"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_model_1 = require("../models/User.model");
var mongoose_1 = require("mongoose");
var User_validation_1 = require("../validations/User.validation");
var bcrypt_1 = require("bcrypt");
var Authz_handle_1 = require("../security/Authz.handle");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.routes = express_1.Router();
        this.initUserRoutes();
    }
    UserRoutes.prototype.initUserRoutes = function () {
        this.routes.get("/findbyemail", [Authz_handle_1.authorize("admin"), function (request, response) {
                User_model_1.UserModel.findOne({ email: request.query.email })
                    .select(["name", "email", "_id", "gender", "cpf", "profiles"])
                    .then(function (user) {
                    if (user) {
                        response.status(200);
                        return response.json(user);
                    }
                    else {
                        response.status(400);
                        return response.json({ message: "User not found!" });
                    }
                });
            }]);
        this.routes.get("", function (request, response) {
            User_model_1.UserModel.find().select(["name", "email", "gender", "cpf", "_id", "profiles"])
                .then(function (users) {
                response.status(200);
                return response.json(users);
            })
                .catch(function (error) {
                response.status(400);
                return response.json({ error: error });
            });
        });
        this.routes.get("/:_id", function (request, response, next) {
            if (!mongoose_1.isValidObjectId(request.params._id)) {
                response.status(404);
                return response.json({ message: "User not found!" });
            }
            User_model_1.UserModel.findById(request.params._id)
                .select(["name", "email"])
                .then(function (user) {
                if (user) {
                    response.status(200);
                    return response.json(user);
                }
                response.status(201);
                response.json({ message: "User not found" });
            })
                .catch(function (error) {
                next(error);
            });
        });
        this.routes.post("", function (request, response) {
            var user = new User_model_1.UserModel(request.body);
            var userValidation = new User_validation_1.UserValidation();
            var userValid = userValidation.userIsValid(request.body);
            userValidation.isEmail(request.body.email).then(function (value) {
                if (value === false) {
                    if (userValid.isValid) {
                        user.save()
                            .then(function (user) {
                            var res = { user: user._id, name: user.name, email: user.email, gender: user.gender, cpf: user.cpf };
                            response.status(201);
                            return response.json(res);
                        });
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
        this.routes.patch("/:_id", function (request, response) {
            var userValidation = new User_validation_1.UserValidation();
            userValidation.isEmail(request.body.email)
                .then(function (isExists) {
                if (isExists === false) {
                    User_model_1.UserModel.findByIdAndUpdate({ _id: request.params._id }, { name: request.body.name, email: request.body.email, password: bcrypt_1.hashSync(request.body.password, 10), gender: request.body.gender }, {
                        new: true, runValidators: true
                    })
                        .then(function (user) {
                        if (user) {
                            response.status(204);
                            return response.send();
                        }
                        response.status(404);
                        return response.json({ message: "User not found!" });
                    });
                }
                if (isExists === true) {
                    response.status(400);
                    return response.json({ message: "user already exists!" });
                }
            });
        });
        this.routes.delete("/:_id", function (request, response) {
            var isValidId = mongoose_1.isValidObjectId(request.params._id);
            if (!isValidId) {
                response.status(404);
                return response.json({ message: "User not found!" });
            }
            User_model_1.UserModel.findByIdAndDelete(request.params._id)
                .then(function () {
                response.status(204);
                return response.send();
            }).catch(function (error) {
                response.status(400);
                return response.json({ message: "Bad request", error: error });
            });
        });
    };
    return UserRoutes;
}());
exports.default = new UserRoutes().routes;
