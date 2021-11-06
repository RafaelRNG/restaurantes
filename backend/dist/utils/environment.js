"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    server: {
        port: process.env.SERVER_PORT || 3333
    },
    db: {
        url: process.env.DB_URL || "mongodb://localhost/restaurants"
    },
    model: {
        emailValidation: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    security: {
        apiSecret: process.env.API_SECRET || "rng-api-secret"
    }
};
