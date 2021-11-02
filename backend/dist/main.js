"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var environment_1 = require("./utils/environment");
server_1.default.listen(environment_1.environment.server.port, function () { return console.log("server is running on " + environment_1.environment.server.port); });
