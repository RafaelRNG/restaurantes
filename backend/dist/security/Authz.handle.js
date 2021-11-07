"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
exports.authorize = function () {
    var profiles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        profiles[_i] = arguments[_i];
    }
    return function (request, response, next) {
        var _a;
        if (request.authenticated !== undefined && (_a = request.authenticated).hasAny.apply(_a, profiles)) {
            next();
        }
        else {
            response.status(403);
            return response.json({ message: "Permission denied!" });
        }
    };
};
