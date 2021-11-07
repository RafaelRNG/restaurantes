"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenParser = void 0;
var User_model_1 = require("../models/User.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var environment_1 = require("../utils/environment");
exports.tokenParser = function (request, response, next) {
    var token = extractToken(request);
    if (token) {
        jsonwebtoken_1.default.verify(token, environment_1.environment.security.apiSecret, applyBearer(request, next));
    }
    else {
        next();
    }
};
function extractToken(request) {
    //header
    //Authorization: Bearer token
    var authorization = request.header("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.substring(7);
    }
}
function applyBearer(request, next) {
    return function (error, decoded) {
        if (decoded) {
            User_model_1.UserModel.findOne({ email: decoded.sub })
                .then(function (user) {
                if (user) {
                    //@ts-ignore
                    request.authenticated = user;
                }
                next();
            })
                .catch(next);
        }
        else {
            next();
        }
    };
}
