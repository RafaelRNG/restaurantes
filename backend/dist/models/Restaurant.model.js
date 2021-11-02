"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
var mongoose_1 = require("mongoose");
var menuSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
var restaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
});
exports.RestaurantModel = mongoose_1.model("Restaurants", restaurantSchema);
