"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var User_model_1 = require("../models/User.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var environment_1 = require("../utils/environment");
exports.authenticate = function (request, response, next) {
    var _a = request.body, email = _a.email, password = _a.password;
    User_model_1.UserModel.findOne({ email: email })
        .then(function (user) {
        if (user && user.matches(password)) {
            var token = jsonwebtoken_1.default.sign({
                sub: user.email,
                iss: "rng-api",
            }, environment_1.environment.security.apiSecret);
            response.status(200);
            response.json({ name: user.name, email: user.email, accessToken: "Bearer " + token });
        }
        else {
            response.status(401);
            return response.json({ message: "User not exists or not authorized" });
        }
    })
        .catch(next);
};
