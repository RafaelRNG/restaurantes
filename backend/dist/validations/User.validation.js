"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
var User_model_1 = require("../models/User.model");
var UserValidation = /** @class */ (function () {
    function UserValidation() {
        this.userValidations = {
            isValid: false,
            responses: []
        };
    }
    UserValidation.prototype.userIsValid = function (body) {
        if (body.email === undefined || body.email === null) {
            this.userValidations.responses.push("Email is riquired!");
        }
        if (body.password === undefined || body.password === null) {
            this.userValidations.responses.push("password is riquired!");
        }
        if (body.name === undefined || body.name === null) {
            this.userValidations.responses.push("name is riquired!");
        }
        if (body.name.length > 80 || body.name.length < 3) {
            this.userValidations.responses.push("name is not valid!");
        }
        if (body.gender !== "Male" && body.gender !== "Female") {
            this.userValidations.responses.push("only 'Male' or 'Female' values for gender!");
        }
        if (this.userValidations.responses.length === 0) {
            this.userValidations.isValid = true;
        }
        return this.userValidations;
    };
    UserValidation.prototype.isEmail = function (email) {
        return User_model_1.UserModel.findOne({ "email": email })
            .then(function (value) {
            if (value === null) {
                return false;
            }
            else {
                return true;
            }
        });
    };
    return UserValidation;
}());
exports.UserValidation = UserValidation;
