"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var environment_1 = require("../utils/environment");
var bcrypt_1 = require("bcrypt");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 80
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: environment_1.environment.model.emailValidation
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ["Male", "Female"]
    },
    cpf: {
        type: String,
        required: false
    }
});
userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) {
        next();
    }
    else {
        bcrypt_1.hash(user.password, 10)
            .then(function (hash) {
            user.password = hash;
            next();
        })
            .catch(next);
    }
});
exports.UserModel = mongoose_1.model("User", userSchema);
