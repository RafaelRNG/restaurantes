"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true,
        maxLength: 500
    },
    restaurant: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Restaurants"
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});
exports.ReviewModel = mongoose_1.model("Reviews", reviewSchema);
