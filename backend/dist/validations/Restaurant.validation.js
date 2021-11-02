"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantValidation = void 0;
var RestaurantValidation = /** @class */ (function () {
    function RestaurantValidation() {
    }
    RestaurantValidation.prototype.isRestaurantValid = function (name) {
        if (name === null || name === undefined || name.length < 3 || name.length > 200) {
            return false;
        }
        return true;
    };
    return RestaurantValidation;
}());
exports.RestaurantValidation = RestaurantValidation;
